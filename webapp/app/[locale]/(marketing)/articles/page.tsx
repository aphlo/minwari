import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Header } from "@/client/components/layout/Header";
import { Link } from "@/i18n/navigation";
import { getArticles } from "@/shared/lib/articles";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  const articles = getArticles(locale);
  const t = await getTranslations({ locale, namespace: "marketing.articles" });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-32 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
            {t("title")}
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group block bg-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <time className="text-sm text-primary font-medium mb-3 block">
                  {article.date}
                </time>
                <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-muted text-sm line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                  {t("readMore")}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
