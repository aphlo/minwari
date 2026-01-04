"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import type * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const router = useRouter();

  return (
    <NextThemesProvider {...props}>
      <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
    </NextThemesProvider>
  );
}
