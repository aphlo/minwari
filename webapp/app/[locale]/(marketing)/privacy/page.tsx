import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/client/components/layout/Header";
import { LegalPage } from "@/client/components/marketing/LegalPage";
import { PrivacyContent } from "@/client/components/marketing/PrivacyContent";
import { pageMetadata } from "@/server/lib/pageMetadata";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("marketing.privacy");

  return (
    <>
      <Header />
      <LegalPage title={t("title")}>
        <PrivacyContent />
      </LegalPage>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing.privacy" });
  return pageMetadata(locale, "privacy", t("title"));
}
