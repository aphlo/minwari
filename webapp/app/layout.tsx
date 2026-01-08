import { Noto_Sans_JP } from "next/font/google";
import { getLocale } from "next-intl/server";
import { AnalyticsTracker } from "@/client/components/analytics/AnalyticsTracker";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
