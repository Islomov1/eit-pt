// ─── Shared base ─────────────────────────────────────────────────────────────

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

// ─── English Placement Test ───────────────────────────────────────────────────
// For learners who want to find their English level (A1 → C2)

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type EnglishQuestion = Question & {
  cefrLevel: CefrLevel;
};

export type LevelGroup = {
  level: CefrLevel;
  passmark: number;
  message: string;
};

// ─── SAT Placement Test ───────────────────────────────────────────────────────
// For students preparing for the SAT exam

export type SatStage = "foundation" | "sat" | "advanced";
export type SatSection = "english" | "math";

export type SatQuestion = Question & {
  section: SatSection;
  stage: SatStage;
};

// ─── Shared app types ─────────────────────────────────────────────────────────

export type Band = {
  label: string;
  min: number;
  max: number;
  message: string;
};

export type TestType = "english" | "sat";