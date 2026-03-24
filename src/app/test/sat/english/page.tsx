import GatedSatTest from "@/components/GatedSatTest";
import { satQuestions } from "@/data/satQuestions";

export default function SatEnglishPage() {
  const englishQuestions = satQuestions.filter((q) => q.section === "english");
  return (
    <GatedSatTest
      questions={englishQuestions}
      questionsPerPage={5}
      passMarkPerStage={7}
      sectionTitle="English Section"
    />
  );
}
