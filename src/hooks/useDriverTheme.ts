import { useState, useCallback } from "react";

const DRIVER_THEME_KEY = "fahrverse-driver-theme";

/**
 * Isolated theme hook for the driver dashboard.
 * Returns isDark state + a toggle. The component sets
 * data-driver-theme directly as a JSX prop on the root div,
 * so no ref or effect is needed — React handles it on every render.
 */
export function useDriverTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(DRIVER_THEME_KEY);
      return saved ? saved === "dark" : true;
    } catch {
      return true;
    }
  });

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(DRIVER_THEME_KEY, next ? "dark" : "light");
      } catch {}
      return next;
    });
  }, []);

  return { isDark, toggle };
}
