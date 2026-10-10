import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { GroupViewer } from "@/client/components/groups/GroupViewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "viewer" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function GroupsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("viewer");
  return (
    <Suspense
      fallback={
        <main className="pt-20 px-6" aria-live="polite">
          {t("loading")}
        </main>
      }
    >
      <GroupViewer />
    </Suspense>
  );
}
