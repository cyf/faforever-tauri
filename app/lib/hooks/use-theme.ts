import { useMemo } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
import { useTheme } from "next-themes";
import { defaultTheme } from "@/theme";

export interface UseAppThemeProps {
  /** Update the theme */
  setTheme: (theme: string) => void;

  /** Active theme name */
  theme: string;

  resolvedTheme: string;
}

export default function useAppTheme(): UseAppThemeProps {
  const { theme, systemTheme, setTheme } = useTheme();
  const currentTheme = useMemo(
    () => (theme === "system" ? systemTheme : theme) || defaultTheme,
    [theme, systemTheme],
  );

  // const changeTheme = async (theme: string) => {
  //   setTheme(theme);
  //   await invoke("theme_changed", { name: theme === "system" ? systemTheme : theme });
  // }

  return {
    theme: theme || defaultTheme,
    resolvedTheme: currentTheme,
    setTheme,
  };
}
