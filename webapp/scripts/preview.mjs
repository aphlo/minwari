import { readFile, stat } from "node:fs/promises";
import { createServer, request as proxyRequest } from "node:http";
import { extname, resolve, sep } from "node:path";
import { legacyRedirect } from "../shared/lib/legacyRedirect.ts";

const root = resolve("out");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
createServer(async (incoming, outgoing) => {
  if (incoming.url.startsWith("/api/")) {
    const upstream = proxyRequest(
      {
        hostname: "127.0.0.1",
        port: 8081,
        path: incoming.url,
        method: incoming.method,
        headers: incoming.headers,
      },
      (response) => {
        outgoing.writeHead(response.statusCode, response.headers);
        response.pipe(outgoing);
      }
    );
    upstream.on("error", () => {
      outgoing.writeHead(502);
      outgoing.end("api_unavailable");
    });
    incoming.pipe(upstream);
    return;
  }
  const url = new URL(incoming.url, "http://localhost");
  if (url.pathname === "/") {
    outgoing.writeHead(302, { Location: `/en/${url.search}` });
    outgoing.end();
    return;
  }
  if (
    /^\/(?:[a-zA-Z-]+\/)?(?:groups\/[A-Za-z0-9_-]+|new)(?:\/.*)?$/.test(
      url.pathname
    )
  ) {
    const target = new URL(legacyRedirect(incoming.url));
    outgoing.writeHead(301, {
      Location: target.pathname + target.search + target.hash,
    });
    outgoing.end();
    return;
  }
  try {
    let path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (!path.startsWith(root + sep)) {
      outgoing.writeHead(400);
      outgoing.end();
      return;
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    const content = await readFile(path);
    outgoing.writeHead(200, {
      "Content-Type": mime[extname(path)] ?? "application/octet-stream",
    });
    outgoing.end(content);
  } catch {
    outgoing.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    outgoing.end(await readFile(resolve(root, "404.html")));
  }
}).listen(Number(process.env.PREVIEW_PORT ?? 4173), "127.0.0.1");
