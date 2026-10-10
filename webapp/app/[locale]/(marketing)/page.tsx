import { getTranslations, setRequestLocale } from "next-intl/server";
import Home from "@/client/components/marketing/Home";
import { pageMetadata } from "@/server/lib/pageMetadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return pageMetadata(locale, "", t("title"), t("description"));
}
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}
