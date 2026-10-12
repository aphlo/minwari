import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

test("postbuild generates public sitemap URLs and robots.txt", async () => {
  const directory = await mkdtemp(join(tmpdir(), "oursplit-seo-"));
  try {
    await mkdir(join(directory, "out"));
    // Run the real CLI in a separate process to catch ESM/CommonJS loader errors.
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        import.meta.resolve("tsx"),
        fileURLToPath(new URL("./seo-files.mjs", import.meta.url)),
      ],
      { cwd: directory, encoding: "utf8" }
    );
    assert.ifError(result.error);
    assert.equal(result.status, 0, result.stderr);

    const sitemap = await readFile(join(directory, "out/sitemap.xml"), "utf8");
    assert.match(sitemap, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
    assert.match(
      sitemap,
      /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/
    );
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1]
    );
    assert.equal(urls.length, new Set(urls).size);
    for (const url of urls) {
      assert.equal(new URL(url).origin, "https://oursplit.aphlo.com");
      assert.ok(url.endsWith("/"));
      assert.doesNotMatch(url, /\/(groups|api|new)(\/|\?)/);
    }
    for (const locale of ["en", "ja", "zh-CN", "zh-TW", "ko", "es", "pt-BR"]) {
      for (const path of [
        "",
        "about/",
        "articles/",
        "contact/",
        "privacy/",
        "terms/",
      ]) {
        assert.ok(
          urls.includes(`https://oursplit.aphlo.com/${locale}/${path}`)
        );
      }
      assert.ok(
        urls.includes(
          `https://oursplit.aphlo.com/${locale}/articles/ski-trip-settlement/`
        )
      );
      assert.ok(
        urls.includes(
          `https://oursplit.aphlo.com/${locale}/articles/multiple-payers-settlement/`
        )
      );
    }
    assert.equal(
      await readFile(join(directory, "out/robots.txt"), "utf8"),
      "User-agent: *\nAllow: /\nSitemap: https://oursplit.aphlo.com/sitemap.xml\n"
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
