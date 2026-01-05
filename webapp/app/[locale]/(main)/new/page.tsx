import { getTranslations } from "next-intl/server";
import { NewGroupForm } from "@/client/components/forms/NewGroupForm";
import { Header } from "@/client/components/layout/Header";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("newGroupTitle"),
    description: t("newGroupDescription"),
  };
}

export default async function NewGroupPage() {
  const t = await getTranslations("newGroupPage");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Form Card */}
          <div className="animate-fade-in-up delay-100 opacity-0 bg-card rounded-2xl border border-border p-8 shadow-sm">
            <NewGroupForm />
          </div>

          {/* Info Section */}
          <div className="animate-fade-in-up delay-200 opacity-0 mt-8 bg-bg-secondary rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {t("title")}
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-muted">
                  {t("features.invite")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-muted">
                  {t("features.record")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-muted">
                  {t("features.check")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
