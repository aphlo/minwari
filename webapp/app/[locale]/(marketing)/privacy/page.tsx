import { useTranslations } from "next-intl";
import { Header } from "@/client/components/layout/Header";
import { LegalPage } from "@/client/components/marketing/LegalPage";
import { PrivacyContent } from "@/client/components/marketing/PrivacyContent";

export default function PrivacyPage() {
  const t = useTranslations("marketing.privacy");

  return (
    <>
      <Header />
      <LegalPage title={t("title")}>
        <PrivacyContent />
      </LegalPage>
    </>
  );
}
