import { useTranslations } from "next-intl";
import { Header } from "@/client/components/layout/Header";
import { ContactPage } from "@/client/components/marketing/ContactPage";

export default function Contact() {
  const t = useTranslations("marketing.contact");

  return (
    <>
      <Header />
      <ContactPage title={t("title")} />
    </>
  );
}
