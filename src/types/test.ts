export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

export type Band = {
  label: string;
  min: number;
  max: number;
  message: string;
};

export type TestType = "english" | "sat";