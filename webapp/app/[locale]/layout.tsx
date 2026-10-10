import { Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";
import { AnalyticsTracker } from "@/client/components/analytics/AnalyticsTracker";
import "../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Footer } from "@/client/components/layout/Footer";
import { ThemeProvider } from "@/client/components/layout/ThemeProvider";
import { routing } from "@/i18n/routing";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
    manifest: "/manifest.json",
    metadataBase: new URL("https://oursplit.aphlo.com"),
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
