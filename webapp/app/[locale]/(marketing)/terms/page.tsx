import { useTranslations } from "next-intl";
import { Header } from "@/client/components/layout/Header";
import { LegalPage } from "@/client/components/marketing/LegalPage";
import { TermsContent } from "@/client/components/marketing/TermsContent";

export default function TermsPage() {
  const t = useTranslations("marketing.terms");

  return (
    <>
      <Header />
      <LegalPage title={t("title")}>
        <TermsContent />
      </LegalPage>
    </>
  );
}
