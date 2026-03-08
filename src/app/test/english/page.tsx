import TestShell from "@/components/TestShell";
import { englishBands, englishQuestions } from "@/data/englishQuestions";

export default function EnglishTestPage() {
  return (
    <TestShell
      testType="english"
      title="English Placement Test"
      questions={englishQuestions}
      bands={englishBands}
      questionsPerPage={6}
    />
  );
}