import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

// tsx loads .ts files as CommonJS in this package; use its require hook from ESM.
const require = createRequire(import.meta.url);
const { getArticles } = require("../shared/lib/articles.ts");

const origin = "https://oursplit.aphlo.com";
const locales = ["en", "ja", "zh-CN", "zh-TW", "ko", "es", "pt-BR"];
const paths = ["", "about", "articles", "contact", "privacy", "terms"];
const urls = locales.flatMap((locale) => [
  ...paths.map((path) => `${origin}/${locale}/${path ? `${path}/` : ""}`),
  ...getArticles(locale).map(
    (article) => `${origin}/${locale}/articles/${article.slug}/`
  ),
]);
await writeFile(
  "out/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`
);
await writeFile(
  "out/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
);
