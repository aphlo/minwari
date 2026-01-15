import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/client/components/layout/Header";
import { Link } from "@/i18n/navigation";
import { getArticles } from "@/shared/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
};

export async function generateStaticParams() {
  const articles = getArticles("ja");
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  const articles = getArticles(locale);
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "marketing.articles" });
  const tCta = await getTranslations({ locale, namespace: "marketing.cta" });

  // Related articles (excluding current)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <article className="min-h-screen bg-background pb-16">
      <Header />
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-gray-900 mt-[-64px]">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 pt-32 container mx-auto max-w-4xl">
          <time className="text-primary-foreground/80 font-medium mb-4 block text-lg bg-primary/20 backdrop-blur-md inline-block px-4 py-1 rounded-full border border-primary/20">
            {article.date}
          </time>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border
            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-primary
            prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
            prose-li:text-muted-foreground prose-li:my-2
            prose-strong:text-foreground prose-strong:font-bold
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2
            [&>div.lead]:text-xl [&>div.lead]:font-medium [&>div.lead]:text-foreground
          "
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted content from local file
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA Section */}
        <div className="my-20 p-8 sm:p-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl text-center border border-primary/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors" />

          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              {tCta("title")}
            </h3>
            <p className="mb-8 text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              {tCta("subtitleLine1")}
              {tCta("subtitleLine2")}
            </p>
            <Link
              href="/new"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 text-lg"
            >
              {tCta("action")}
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-border pt-16">
            <h3 className="text-2xl font-bold mb-8 text-foreground flex items-center gap-3">
              <span className="w-1 h-8 bg-primary rounded-full" />
              {t("related")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-border">
                    <Image
                      src={rel.imageUrl}
                      alt={rel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <time className="text-xs text-muted-foreground mb-2 block">
                    {rel.date}
                  </time>
                  <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
