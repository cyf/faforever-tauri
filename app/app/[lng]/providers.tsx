"use client";

import { ThemeProvider } from "next-themes";
import { cacheThemeKey } from "@/constants";
import { useIsTauri } from "@/lib/hooks";

export function Providers({ children }: { children: React.ReactNode }) {
  const isTauri = useIsTauri();

  return (
    <ThemeProvider
      defaultTheme={isTauri ? "light" : "system"}
      enableSystem={!isTauri}
      storageKey={cacheThemeKey}
      attribute="class"
    >
      {children}
    </ThemeProvider>
  );
}
