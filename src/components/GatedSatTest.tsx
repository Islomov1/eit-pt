"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SatQuestion } from "@/data/satQuestions";
import { shuffleArray } from "@/utils/shuffle";

type GatedSatTestProps = {
  questions: SatQuestion[];
  questionsPerPage: number;
  passMarkPerStage: number;
};

type StageKey = "foundation" | "sat" | "advanced";
type FinalBand = "Foundation" | "SAT" | "Advanced";

type ShuffledSatQuestion = SatQuestion & {
  shuffledOptions: string[];
};

const TOTAL_TIME_LIMIT = 30 * 60;

const stageTitles: Record<StageKey, string> = {
  foundation: "Foundation",
  sat: "SAT",
  advanced: "Advanced SAT",
};

const stageMessages: Record<FinalBand, string> = {
  Foundation:
    "You need stronger control of core grammar, reading clarity, and basic math before moving to higher SAT-level work.",
  SAT:
    "You have passed the foundation stage and show SAT-level readiness, but you still need more secure performance on advanced SAT tasks.",
  Advanced:
    "You show strong readiness across both verbal and math tasks and can handle more demanding SAT-style questions.",
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function GatedSatTest({
  questions,
  questionsPerPage,
  passMarkPerStage,
}: GatedSatTestProps) {
  const router = useRouter();

  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_LIMIT);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [pageError, setPageError] = useState("");

  const hasFinishedRef = useRef(false);

  const shuffledQuestions: ShuffledSatQuestion[] = useMemo(() => {
    return questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options),
    }));
  }, [questions]);

  const foundationQuestions = shuffledQuestions.filter((q) => q.stage === "foundation");
  const satQuestions = shuffledQuestions.filter((q) => q.stage === "sat");
  const advancedQuestions = shuffledQuestions.filter((q) => q.stage === "advanced");

  const stages: { key: StageKey; questions: ShuffledSatQuestion[] }[] = [
    { key: "foundation", questions: foundationQuestions },
    { key: "sat", questions: satQuestions },
    { key: "advanced", questions: advancedQuestions },
  ];

  const currentStage = stages[currentStageIndex];
  const totalPages = Math.ceil(currentStage.questions.length / questionsPerPage);

  const currentQuestions = useMemo(() => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return currentStage.questions.slice(start, end);
  }, [currentPage, currentStage.questions, questionsPerPage]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelect(questionId: number, option: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    setPageError("");
  }

  function calculateStageScore(stageQuestions: ShuffledSatQuestion[]) {
    let score = 0;

    for (const question of stageQuestions) {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
    }

    return score;
  }

  function getTotalScore() {
    let score = 0;

    for (const question of shuffledQuestions) {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
    }

    return score;
  }

  function allCurrentQuestionsAnswered() {
    return currentQuestions.every((question) => answers[question.id] !== undefined);
  }

  function finishWithResult(finalBand: FinalBand, stoppedAt: StageKey, options?: { timeUp?: boolean }) {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const foundationScore = calculateStageScore(foundationQuestions);
    const satScore = calculateStageScore(satQuestions);
    const advancedScore = calculateStageScore(advancedQuestions);

    const params = new URLSearchParams({
      test: "sat",
      score: String(getTotalScore()),
      total: String(shuffledQuestions.length),
      band: finalBand,
      message: stageMessages[finalBand],
      stoppedAt,
      foundationScore: String(foundationScore),
      foundationTotal: String(foundationQuestions.length),
      satScore: String(satScore),
      satTotal: String(satQuestions.length),
      advancedScore: String(advancedScore),
      advancedTotal: String(advancedQuestions.length),
      passMark: String(passMarkPerStage),
      timeUp: options?.timeUp ? "true" : "false",
    });

    router.push(`/result?${params.toString()}`);
  }

  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;

    if (timeLeft <= 0) {
      const foundationScore = calculateStageScore(foundationQuestions);
      const satScore = calculateStageScore(satQuestions);
      const advancedScore = calculateStageScore(advancedQuestions);

      if (
        advancedScore >= passMarkPerStage &&
        satScore >= passMarkPerStage &&
        foundationScore >= passMarkPerStage
      ) {
        finishWithResult("Advanced", "advanced", { timeUp: true });
      } else if (foundationScore >= passMarkPerStage) {
        if (satScore >= passMarkPerStage) {
          finishWithResult("SAT", "advanced", { timeUp: true });
        } else {
          finishWithResult("SAT", "sat", { timeUp: true });
        }
      } else {
        finishWithResult("Foundation", "foundation", { timeUp: true });
      }

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeft, answers]);

  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasStarted]);

  function goNext() {
    if (!allCurrentQuestionsAnswered()) {
      setPageError("Please answer all questions on this page before continuing.");
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setPageError("");
      scrollToTop();
      return;
    }

    const stageScore = calculateStageScore(currentStage.questions);

    if (currentStage.key === "foundation") {
      if (stageScore < passMarkPerStage) {
        finishWithResult("Foundation", "foundation");
        return;
      }

      setCurrentStageIndex(1);
      setCurrentPage(0);
      setPageError("");
      scrollToTop();
      return;
    }

    if (currentStage.key === "sat") {
      if (stageScore < passMarkPerStage) {
        finishWithResult("SAT", "sat");
        return;
      }

      setCurrentStageIndex(2);
      setCurrentPage(0);
      setPageError("");
      scrollToTop();
      return;
    }

    if (currentStage.key === "advanced") {
      if (stageScore >= passMarkPerStage) {
        finishWithResult("Advanced", "advanced");
      } else {
        finishWithResult("SAT", "advanced");
      }
    }
  }

  function goBack() {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setPageError("");
      scrollToTop();
    }
  }

  const currentStageAnsweredCount = currentStage.questions.filter(
    (question) => answers[question.id] !== undefined
  ).length;

  const overallAnsweredCount = Object.keys(answers).length;

  if (!hasStarted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#16345C]">
            Instructions
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">
            SAT Placement Test
          </h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Questions</p>
              <p className="mt-2 text-2xl font-semibold text-[#0B1F3A]">
                {shuffledQuestions.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Time Limit</p>
              <p className="mt-2 text-2xl font-semibold text-[#0B1F3A]">30:00</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Structure</p>
              <p className="mt-2 text-lg font-semibold text-[#0B1F3A]">
                15 + 15 + 15
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              <li>• This test has 3 stages: Foundation, SAT, and Advanced SAT.</li>
              <li>• You must score at least 9 out of 15 to move to the next stage.</li>
              <li>• You must answer all questions on a page before continuing.</li>
              <li>• The timer starts only when you click “Start Test”.</li>
              <li>• If time runs out, your test will be submitted automatically.</li>
              <li>• If you refresh or leave the page during the test, your answers may be lost.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setHasStarted(true);
                scrollToTop();
              }}
              className="rounded-xl bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
            >
              Start Test
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#16345C]">
              SAT Placement Test
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-[#0B1F3A]">
              {stageTitles[currentStage.key]}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              You must score at least {passMarkPerStage} out of 15 to move to the next stage.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <p>
              Time left: <span className="font-semibold text-[#0B1F3A]">{formatTime(timeLeft)}</span>
            </p>
            <p className="mt-1">
              Stage <span className="font-semibold text-[#0B1F3A]">{currentStageIndex + 1}</span> of{" "}
              <span className="font-semibold text-[#0B1F3A]">3</span>
            </p>
            <p className="mt-1">
              Page <span className="font-semibold text-[#0B1F3A]">{currentPage + 1}</span> of{" "}
              <span className="font-semibold text-[#0B1F3A]">{totalPages}</span>
            </p>
            <p className="mt-1">
              Stage answered:{" "}
              <span className="font-semibold text-[#0B1F3A]">{currentStageAnsweredCount}</span> /{" "}
              <span className="font-semibold text-[#0B1F3A]">{currentStage.questions.length}</span>
            </p>
            <p className="mt-1">
              Overall answered:{" "}
              <span className="font-semibold text-[#0B1F3A]">{overallAnsweredCount}</span> /{" "}
              <span className="font-semibold text-[#0B1F3A]">{shuffledQuestions.length}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#0B1F3A] transition-all"
            style={{
              width: `${((currentPage + 1) / totalPages) * 100}%`,
            }}
          />
        </div>

        {pageError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {pageError}
          </div>
        )}

        <div className="mt-8 space-y-8">
          {currentQuestions.map((question, index) => {
            const localQuestionNumber = currentPage * questionsPerPage + index + 1;
            const selectedAnswer = answers[question.id];

            return (
              <div key={question.id} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#16345C]">
                  Question {localQuestionNumber}
                </p>
                <p className="mt-2 text-lg font-medium leading-7 text-[#0B1F3A]">
                  {question.text}
                </p>

                <div className="mt-5 grid gap-3">
                  {question.shuffledOptions.map((option) => {
                    const isSelected = selectedAnswer === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(question.id, option)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                          isSelected
                            ? "border-[#0B1F3A] bg-[#0B1F3A] text-white"
                            : "border-slate-300 bg-white text-slate-700 hover:border-[#16345C] hover:bg-slate-50"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={currentPage === 0}
            className="rounded-xl border border-[#0B1F3A] px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={goNext}
            className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
          >
            {currentPage < totalPages - 1 ? "Next" : currentStageIndex === 2 ? "Finish Test" : "Check Stage"}
          </button>
        </div>
      </div>
    </main>
  );
}