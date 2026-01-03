import Link from "next/link";
import { NewGroupForm } from "@/client/components/NewGroupForm";

export const metadata = {
  title: "グループを作成 | みんなの割り勘",
  description: "新しい割り勘グループを作成して、メンバーを招待しましょう。",
};

export default function NewGroupPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-14">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-xl font-semibold text-foreground">
                みんなの割り勘
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
              新しいグループを作成
            </h1>
          </div>

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
              グループ作成後にできること
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
                  URLを共有してメンバーを招待
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
                  支出を記録して割り勘を計算
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
                  誰がいくら払うか一目で確認
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
