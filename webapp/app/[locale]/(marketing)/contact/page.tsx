import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/client/components/layout/Header";
import { ContactPage } from "@/client/components/marketing/ContactPage";
import { pageMetadata } from "@/server/lib/pageMetadata";

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("marketing.contact");

  return (
    <>
      <Header />
      <ContactPage title={t("title")} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing.contact" });
  return pageMetadata(locale, "contact", t("title"));
}
