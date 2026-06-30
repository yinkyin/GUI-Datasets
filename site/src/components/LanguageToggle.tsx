import { useLanguage } from "@/i18n/useLanguage";
import type { Lang } from "@/i18n/strings";

const options: Array<{ value: Lang; label: string }> = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中" }
];

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card/70 p-1 shadow-xs backdrop-blur"
      role="group"
      aria-label={t("lang.toggle")}
    >
      {options.map(({ value, label }) => {
        const isActive = lang === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLang(value)}
            className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
