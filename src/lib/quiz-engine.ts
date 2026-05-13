import type { Field } from "@/data/schools";
import { questions } from "@/data/quiz";

export const allFields: Field[] = [
  "tech", "health", "business", "arts", "science", "social",
  "trades", "service", "agri", "security", "transport", "education",
];

export function emptyScores(): Record<Field, number> {
  return {
    tech: 0, health: 0, business: 0, arts: 0, science: 0, social: 0,
    trades: 0, service: 0, agri: 0, security: 0, transport: 0, education: 0,
  };
}

export function computeScores(answers: (number | null)[]): Record<Field, number> {
  const s = emptyScores();
  answers.forEach((a, i) => {
    if (a == null) return;
    const opt = questions[i].options[a];
    Object.entries(opt.weights).forEach(([f, w]) => {
      s[f as Field] += w ?? 0;
    });
  });
  return s;
}

export function rankFields(scores: Record<Field, number>): [Field, number][] {
  return (Object.entries(scores) as [Field, number][])
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0);
}
