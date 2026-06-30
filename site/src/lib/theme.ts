import type { Platform } from "@/types/dataset";

/**
 * Platform color families. Warm-cream design system:
 * yellow (primary) + coral (accent) + charcoal + warm neutrals.
 * Light and dark variants keep charts readable across themes.
 */
export const platformColorsLight: Record<Platform, string> = {
  Web: "#E0B43A",
  Mobile: "#F4796B",
  "Cross-platform": "#1C1C1E",
  Security: "#D9603F",
  "Screenshot-to-code": "#E89A2E",
  "Chinese GUI": "#C44A66"
};

export const platformColorsDark: Record<Platform, string> = {
  Web: "#F6D24E",
  Mobile: "#F4796B",
  "Cross-platform": "#C9C4BC",
  Security: "#F08A63",
  "Screenshot-to-code": "#F6B73C",
  "Chinese GUI": "#E5708A"
};

export function getPlatformColors(isDark: boolean): Record<Platform, string> {
  return isDark ? platformColorsDark : platformColorsLight;
}

/** Accent used for single-series charts (bars). */
export function getChartAccent(isDark: boolean) {
  return isDark ? "#F6D24E" : "#D9A521";
}

/** Neutral axis / grid colors for recharts. */
export function getChartNeutrals(isDark: boolean) {
  return {
    axis: isDark ? "#A39E97" : "#8B8782",
    grid: isDark ? "rgba(163,158,151,0.18)" : "rgba(28,28,30,0.10)"
  };
}

export const platformLabels: Record<Platform, string> = {
  Web: "Web",
  Mobile: "Mobile",
  "Cross-platform": "Cross-platform",
  Security: "Security",
  "Screenshot-to-code": "Screenshot-to-code",
  "Chinese GUI": "Chinese GUI"
};
