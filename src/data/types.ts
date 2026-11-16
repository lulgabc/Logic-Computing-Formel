export type Level = "入门" | "进阶" | "研究" | "入门 → 进阶" | "进阶 → 研究" | "入门 → 研究";
export type BookUse = "先读" | "主教材" | "进阶" | "工具书" | "实践" | "特色";
export type ToolKind = "open" | "commercial" | "research";
export type ToolTag = "主流" | "特色" | "教学" | "工业" | "研究" | "工具" | "经典";
export type ClaimStatus = "verified" | "reported" | "pending";

export interface Course {
  name: string;
  org: string;
  level: Level;
  format: string;
  url: string;
  note: string;
}

export interface Book {
  title: string;
  authors: string;
  year: string;
  level: Level;
  use: BookUse;
  note: string;
  url?: string;
}

export interface LatestItem {
  date: string;
  title: string;
  body: string;
  status: ClaimStatus;
  source?: { label: string; url: string };
}

export interface Tool {
  name: string;
  kind: ToolKind;
  tags: ToolTag[];
  lang: string;
  license: string;
  note: string;
  url: string;
}

export interface Lab {
  title: string;
  goal: string;
  steps: string[];
  deliverable: string;
  stretch?: string;
  code?: string;
}

export interface Paper {
  order: number;
  title: string;
  authors: string;
  year: string;
  venue: string;
  why: string;
  url: string;
}

export interface Stage {
  title: string;
  weeks: string;
  items: string[];
  output: string;
}

export interface Topic {
  slug: string;
  index: string;
  title: string;
  en: string;
  glyph: string;
  tagline: string;
  question: string;
  difficulty: string;
  hours: string;
  prerequisites: string[];
  accent: string;
  intro: {
    lead: string;
    paragraphs: string[];
    concepts: { term: string; def: string }[];
    subfields: { name: string; desc: string }[];
    why: string[];
  };
  stages: Stage[];
  courses: Course[];
  books: Book[];
  latest: LatestItem[];
  tools: Tool[];
  labs: Lab[];
  papers: Paper[];
  misconceptions: { myth: string; truth: string }[];
  checkpoints: string[];
  connections: { slug: string; note: string }[];
}
