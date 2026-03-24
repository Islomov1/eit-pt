import TestShell from "@/components/TestShell";
import { englishQuestions, englishLevelGroups } from "@/data/englishQuestions";

export default function EnglishTestPage() {
  return (
    <TestShell
      testType="english"
      title="English Placement Test"
      questions={englishQuestions}
      levelGroups={englishLevelGroups}
      questionsPerPage={6}
    />
  );
}
