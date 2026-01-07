"use client";

import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const widgetConfig = {
  productId: "432a30ee-13ca-426e-8924-051858d06645",
  containerId: "koeloop-widget-432a30ee-13ca-426e-8924-051858d06645",
  primaryColor: "#7020FF",
  showVoting: false,
  showFeedback: true,
  showFAQ: true,
  showEmailField: false,
  locale: "ja",
  apiBase: "https://koeloop.dev",
};

const scriptId = "koeloop-widget-script";

type WidgetTheme = "light" | "dark";
type WidgetLocale = "ja" | "en";

function getWidgetTheme(resolvedTheme?: string): WidgetTheme {
  return resolvedTheme === "dark" ? "dark" : "light";
}

function getWidgetLocale(locale: string): WidgetLocale {
  return locale === "ja" ? "ja" : "en";
}

function initializeWidget(theme: WidgetTheme, locale: WidgetLocale) {
  if (typeof window === "undefined") {
    return;
  }

  const container = document.getElementById(
    widgetConfig.containerId
  ) as HTMLDivElement | null;

  if (!container) {
    return;
  }

  const widgetConstructor = (
    window as typeof window & {
      KoeLoopWidget?: new (
        config: typeof widgetConfig & {
          theme: WidgetTheme;
          locale: WidgetLocale;
        }
      ) => undefined;
    }
  ).KoeLoopWidget;

  if (!widgetConstructor) {
    return;
  }

  const previousTheme = container.dataset.koeloopTheme;
  const previousLocale = container.dataset.koeloopLocale;

  if (
    previousTheme === theme &&
    previousLocale === locale &&
    container.dataset.koeloopInitialized === "true"
  ) {
    return;
  }

  if (
    (previousTheme && previousTheme !== theme) ||
    (previousLocale && previousLocale !== locale)
  ) {
    container.innerHTML = "";
    delete container.dataset.koeloopInitialized;
  }

  container.dataset.koeloopInitialized = "true";
  container.dataset.koeloopTheme = theme;
  container.dataset.koeloopLocale = locale;
  new widgetConstructor({ ...widgetConfig, theme, locale });
}

interface ContactPageProps {
  title: string;
}

export function ContactPage({ title }: ContactPageProps) {
  const { resolvedTheme } = useTheme();
  const widgetTheme = getWidgetTheme(resolvedTheme);
  const locale = useLocale();
  const widgetLocale = getWidgetLocale(locale);

  useEffect(() => {
    const handleLoad = () => {
      const script = document.getElementById(scriptId);
      script?.setAttribute("data-loaded", "true");
      initializeWidget(widgetTheme, widgetLocale);
    };

    const existingScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        initializeWidget(widgetTheme, widgetLocale);
      } else {
        existingScript.addEventListener("load", handleLoad);
      }
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://koeloop.dev/widget.js";
      script.async = true;
      script.addEventListener("load", handleLoad);
      document.body.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      script?.removeEventListener("load", handleLoad);
    };
  }, [widgetTheme, widgetLocale]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-20 sm:py-24 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div id={widgetConfig.containerId} className="min-h-[520px] w-full" />
        </div>
      </main>
    </div>
  );
}
