"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { Header } from "@/client/components/layout/Header";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const t = useTranslations("marketing");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="animate-fade-in-up text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
            {t("hero.titleLine1")}
            <br />
            <span className="text-primary">{t("hero.titleLine2")}</span>
          </h1>
          <p className="animate-fade-in-up delay-100 text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed opacity-0">
            {t("hero.subtitleLine1")}
            <br className="hidden sm:block" />
            {t("hero.subtitleLine2")}
          </p>
          <div className="animate-fade-in-up delay-200 flex flex-col sm:flex-row gap-4 justify-center opacity-0">
            <Button
              as={Link}
              href="/new"
              color="primary"
              size="lg"
              radius="full"
              className="font-medium"
            >
              {t("hero.actions.start")}
            </Button>
            <Button
              as={Link}
              href="#features"
              variant="bordered"
              size="lg"
              radius="full"
              className="font-medium"
            >
              {t("hero.actions.learnMore")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-card rounded-2xl p-8 hover-lift cursor-pointer border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t("features.items.create.title")}
              </h3>
              <p className="text-muted leading-relaxed">
                {t("features.items.create.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-card rounded-2xl p-8 hover-lift cursor-pointer border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t("features.items.record.title")}
              </h3>
              <p className="text-muted leading-relaxed">
                {t("features.items.record.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-card rounded-2xl p-8 hover-lift cursor-pointer border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t("features.items.settle.title")}
              </h3>
              <p className="text-muted leading-relaxed">
                {t("features.items.settle.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-foreground tracking-tight mb-16">
            {t("steps.title")}
          </h2>

          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                1
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("steps.items.create.title")}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t("steps.items.create.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                2
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("steps.items.add.title")}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t("steps.items.add.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-lg font-semibold">
                3
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("steps.items.check.title")}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t("steps.items.check.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-12 sm:p-16 text-center">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
                {t("cta.subtitleLine1")}
                <br className="sm:hidden" />
                {t("cta.subtitleLine2")}
              </p>
              <Button
                as={Link}
                href="/new"
                size="lg"
                radius="full"
                className="bg-white text-primary font-medium hover:bg-white/90"
              >
                {t("cta.action")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
