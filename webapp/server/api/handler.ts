import type { IncomingMessage, ServerResponse } from "node:http";
import { loadGroupDetail } from "@/server/loaders/groupDetailLoader";
import { legacyRedirect } from "@/shared/lib/legacyRedirect";
import type { GroupDetail } from "@/shared/types/groupDetail";

type LoadDetail = (id: string) => Promise<GroupDetail | null>;

export function createReadOnlyHandler(load: LoadDetail = loadGroupDetail) {
  return async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("X-Content-Type-Options", "nosniff");
    const send = (status: number, body: unknown) => {
      response.writeHead(status);
      response.end(JSON.stringify(body));
    };
    const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
    // Redirect legacy page paths on this API endpoint to the canonical site.
    if (
      !pathname.startsWith("/api/") &&
      pathname !== "/api" &&
      pathname !== "/api/health" &&
      (request.method === "GET" || request.method === "HEAD")
    ) {
      response.writeHead(301, { Location: legacyRedirect(request.url ?? "/") });
      response.end();
      return;
    }
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      send(405, { error: "method_not_allowed" });
      return;
    }
    if (pathname === "/api/health") {
      send(200, { status: "ok" });
      return;
    }
    const match = /^\/api\/groups\/([^/]+)$/.exec(pathname);
    if (!match) {
      send(404, { error: "not_found" });
      return;
    }
    let id: string;
    try {
      id = decodeURIComponent(match[1]);
    } catch {
      send(400, { error: "invalid_id" });
      return;
    }
    if (
      !id ||
      id.includes("/") ||
      id === "." ||
      id === ".." ||
      Buffer.byteLength(id) > 1500
    ) {
      send(400, { error: "invalid_id" });
      return;
    }
    try {
      const detail = await load(id);
      send(detail ? 200 : 404, detail ?? { error: "not_found" });
    } catch {
      send(500, { error: "server_error" });
    }
  };
}
