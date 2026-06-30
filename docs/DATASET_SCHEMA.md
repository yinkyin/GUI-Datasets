# GUI Dataset Catalog Schema

This repository should grow like a data product, not a loose bookmark list. Every dataset entry should answer four user questions:

1. What is inside the dataset?
2. What research task is it best for?
3. How do I access it?
4. What should I be careful about?

## Canonical fields

The current companion website uses `site/src/data/datasets.ts` as the source of truth. When the catalog grows, this can be migrated to root-level JSON/YAML and generated into TypeScript.

```ts
interface GuiDataset {
  id: string;
  name: string;
  shortName: string;
  platform: "Web" | "Mobile" | "Cross-platform" | "Security" | "Screenshot-to-code" | "Chinese GUI";
  stars: 1 | 2 | 3;
  source: string;
  scaleLabel: string;
  scaleValue: number;
  unit: "screens" | "pairs" | "traces" | "qa" | "images" | "mixed";
  region: "Global" | "China-focused" | "Mixed";
  language: "English" | "Chinese" | "Multilingual" | "N/A";
  access: "Hugging Face" | "Kaggle" | "GitHub" | "Project Page" | "Paper" | "Roboflow" | "OpenDataLab" | "Data Registry" | "Website";
  downloadable: boolean;
  license?: string;
  year?: number;
  summary: string;
  bestFor: string[];
  tasks: string[];
  surfaces: string[];
  annotations: string[];
  modalities: string[];
  strengths: string[];
  caveats: string[];
  links: Array<{ label: string; url: string; type: "download" | "paper" | "code" | "project" | "mirror" | "homepage" }>;
}
```

## Curation rules

- Prefer factual summaries over marketing copy.
- Keep `scaleValue` numeric so charts can aggregate scale.
- Use `stars` as editorial importance, not quality judgment:
  - 3 = foundational or highly strategic.
  - 2 = strong task-specific value.
  - 1 = useful supplement, baseline, or small benchmark.
- Always include caveats. A good catalog helps users avoid wrong data choices.
- Separate platform from task. Example: `Mobile` platform can support `Grounding`, `Agent training`, `Question answering`, and `Retrieval`.
- Highlight China-focused datasets explicitly because they are a major differentiator for GUI agent work.

## Auto-classification workflow

Use the CLI helper for a first pass:

```bash
npm run classify -- "https://huggingface.co/datasets/openbmb/CAGUI" "Chinese Android GUI grounding agent traces bilingual instructions"
```

After classification, add the verified record to `site/src/data/datasets.ts`.

The helper only proposes metadata. Before merging, verify:

- dataset license and access restrictions;
- exact sample count and split protocol;
- whether screenshots, view hierarchies, boxes, traces or text annotations are actually released;
- canonical paper/project links;
- whether the dataset belongs in the main catalog or an adjacent/supporting list.
