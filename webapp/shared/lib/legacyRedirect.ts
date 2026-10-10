const locales = new Set(["en", "ja", "zh-CN", "zh-TW", "ko", "es", "pt-BR"]);
const canonicalOrigin = "https://oursplit.aphlo.com";

export function legacyRedirect(requestUrl: string): string {
  const source = new URL(requestUrl, canonicalOrigin);
  const segments = source.pathname.split("/").filter(Boolean);
  const locale = locales.has(segments[0]) ? segments.shift() : "en";
  const destination = new URL(`/${locale}/`, canonicalOrigin);
  destination.search = source.search;
  if (segments[0] === "groups" && segments[1]) {
    destination.pathname = `/${locale}/groups/`;
    destination.searchParams.set("id", segments[1]);
    if (segments[2] === "settlement")
      destination.searchParams.set("view", "settlement");
  } else if (segments[0] === "new") {
    destination.hash = "download";
  } else {
    destination.pathname = `/${locale}/${segments.length ? `${segments.join("/")}/` : ""}`;
  }
  return destination.href;
}
