import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/** Returns whether the resolved theme is dark, SSR/hydration safe. */
export function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);
  return isDark;
}
