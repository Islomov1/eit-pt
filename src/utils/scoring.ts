import { Band } from "@/types/test";

export function calculateScore(
  answers: Record<number, string>,
  questions: { id: number; correctAnswer: string }[]
): number {
  let score = 0;

  for (const question of questions) {
    if (answers[question.id] === question.correctAnswer) {
      score += 1;
    }
  }

  return score;
}

export function getBand(score: number, bands: Band[]): Band {
  const matchedBand = bands.find((band) => score >= band.min && score <= band.max);

  if (!matchedBand) {
    return bands[bands.length - 1];
  }

  return matchedBand;
}
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}