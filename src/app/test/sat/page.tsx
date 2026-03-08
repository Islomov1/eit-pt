import GatedSatTest from "@/components/GatedSatTest";
import { satQuestions } from "@/data/satQuestions";

export default function SatTestPage() {
  return <GatedSatTest questions={satQuestions} questionsPerPage={5} passMarkPerStage={9} />;
}