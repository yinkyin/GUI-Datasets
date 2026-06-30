import { Link as LinkIcon } from "lucide-react";
import type { GuiDataset } from "@/types/dataset";

export function LinkPill({ link }: { link: GuiDataset["links"][number] }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition hover:border-foreground/30 hover:bg-muted"
    >
      <LinkIcon className="h-3.5 w-3.5" />
      {link.label}
    </a>
  );
}
