export type Platform = "Web" | "Mobile" | "Cross-platform" | "Security" | "Screenshot-to-code" | "Chinese GUI";

export type AccessType =
  | "Hugging Face"
  | "Kaggle"
  | "GitHub"
  | "Project Page"
  | "Paper"
  | "Roboflow"
  | "OpenDataLab"
  | "Data Registry"
  | "Website";

export interface DatasetLink {
  label: string;
  url: string;
  type: "download" | "paper" | "code" | "project" | "mirror" | "homepage";
}

export interface GuiDataset {
  id: string;
  name: string;
  shortName: string;
  platform: Platform;
  stars: 1 | 2 | 3;
  source: string;
  scaleLabel: string;
  scaleValue: number;
  unit: "screens" | "pairs" | "traces" | "qa" | "images" | "mixed";
  region: "Global" | "China-focused" | "Mixed";
  language: "English" | "Chinese" | "Multilingual" | "N/A";
  access: AccessType;
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
  links: DatasetLink[];
}

/** Optional Chinese display mirror for a dataset (keyed by id). English remains the filter key. */
export interface DatasetZh {
  summary?: string;
  scaleLabel?: string;
  source?: string;
  bestFor?: string[];
  tasks?: string[];
  surfaces?: string[];
  annotations?: string[];
  modalities?: string[];
  strengths?: string[];
  caveats?: string[];
}

export interface ClassifierResult {
  platform: Platform;
  access: AccessType;
  tasks: string[];
  annotations: string[];
  modalities: string[];
  region: GuiDataset["region"];
  confidence: number;
  rationale: string[];
}
