"use client";

import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
          {title}
        </h1>
        <article className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-p:text-muted prose-li:text-muted max-w-none">
          {children}
        </article>
      </main>
    </div>
  );
}
