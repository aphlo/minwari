import { getTranslations } from "next-intl/server";
import { Header } from "@/client/components/layout/Header";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "marketing.about" });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <main className="max-w-3xl mx-auto px-6 py-20 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

          <div className="prose dark:prose-invert">
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                {t("aboutService.title")}
              </h2>
              <p className="mb-4">{t("aboutService.description1")}</p>
              <p>{t("aboutService.description2")}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                {t("profile.title")}
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="font-bold">{t("profile.nameLabel")}</dt>
                  <dd>{t("profile.nameValue")}</dd>
                </div>
                <div>
                  <dt className="font-bold">{t("profile.contactLabel")}</dt>
                  <dd>{t("profile.contactValue")}</dd>
                </div>
                <div>
                  <dt className="font-bold">{t("profile.purposeLabel")}</dt>
                  <dd>{t("profile.purposeValue")}</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                {t("disclaimer.title")}
              </h2>
              <p>{t("disclaimer.content")}</p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
