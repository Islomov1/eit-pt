import GatedSatTest from "@/components/GatedSatTest";
import { satQuestions } from "@/data/satQuestions";

export default function SatMathPage() {
  const mathQuestions = satQuestions.filter((q) => q.section === "math");
  return (
    <GatedSatTest
      questions={mathQuestions}
      questionsPerPage={5}
      passMarkPerStage={7}
      sectionTitle="Math Section"
    />
  );
}
