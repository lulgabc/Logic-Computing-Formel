import type { Topic } from "../types";
import { mathematicalLogic } from "./mathematical-logic";
import { typeTheory } from "./type-theory";
import { categoryTheory } from "./category-theory";
import { computabilityComplexity } from "./computability-complexity";
import { formalMethods } from "./formal-methods";
import { optimization } from "./optimization";
import { satSmtProof } from "./sat-smt-proof";
import { systemVerilog } from "./systemverilog";
import { reproProjects } from "../repro";

export const topics: Topic[] = [
  mathematicalLogic,
  typeTheory,
  categoryTheory,
  computabilityComplexity,
  formalMethods,
  optimization,
  satSmtProof,
  systemVerilog,
];

export const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string): Topic | undefined {
  return topicBySlug.get(slug);
}

export function getAdjacentTopics(slug: string) {
  const index = topics.findIndex((topic) => topic.slug === slug);
  return {
    previous: index > 0 ? topics[index - 1] : undefined,
    next: index >= 0 && index < topics.length - 1 ? topics[index + 1] : undefined,
  };
}

const toolEntries = topics.reduce((sum, topic) => sum + topic.tools.length, 0);
const uniqueTools = new Set(topics.flatMap((topic) => topic.tools.map((tool) => tool.name)));

export const totalStats = {
  topics: topics.length,
  courses: topics.reduce((sum, topic) => sum + topic.courses.length, 0),
  books: topics.reduce((sum, topic) => sum + topic.books.length, 0),
  tools: uniqueTools.size,
  toolEntries,
  labs: topics.reduce((sum, topic) => sum + topic.labs.length, 0),
  papers: topics.reduce((sum, topic) => sum + topic.papers.length, 0),
  repros: reproProjects.length,
  checkpoints: topics.reduce((sum, topic) => sum + topic.checkpoints.length, 0),
};
