import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/client/components/layout/Header";
import { LegalPage } from "@/client/components/marketing/LegalPage";
import { TermsContent } from "@/client/components/marketing/TermsContent";
import { pageMetadata } from "@/server/lib/pageMetadata";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("marketing.terms");

  return (
    <>
      <Header />
      <LegalPage title={t("title")}>
        <TermsContent />
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
  const t = await getTranslations({ locale, namespace: "marketing.terms" });
  return pageMetadata(locale, "terms", t("title"));
}
