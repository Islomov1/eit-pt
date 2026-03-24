"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SatQuestion, SatSection, SatStage } from "@/types/test";
import { shuffleArray } from "@/utils/shuffle";

type GatedSatTestProps = {
  questions: SatQuestion[];
  questionsPerPage: number;
  passMarkPerStage: number;
  sectionTitle: string;
};



type ShuffledSatQuestion = SatQuestion & {
  shuffledOptions: string[];
};

const TOTAL_TIME_LIMIT = 25 * 60; // 25 min per section // 45 min for 60 questions

const stageTitles: Record<SatStage, string> = {
  foundation: "Foundation",
  sat: "SAT",
  advanced: "Advanced",
};

const sectionLabels: Record<SatSection, string> = {
  english: "English",
  math: "Math",
};

const bandMessages: Record<string, string> = {
  Foundation:
    "You need stronger control of core skills before moving to higher SAT-level work.",
  SAT: "You have passed the Foundation stage and show solid SAT-level readiness.",
  Advanced:
    "You show strong readiness across demanding SAT-style questions.",
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
  sectionTitle,
}: GatedSatTestProps) {
  const router = useRouter();

  const [hasStarted, setHasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_LIMIT);

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [pageError, setPageError] = useState("");

  const hasFinishedRef = useRef(false);

  const stages: SatStage[] = ["foundation", "sat", "advanced"];

  // Derive the section from the questions passed in (all questions in one call are same section)
  const currentSection: SatSection = useMemo(() => {
    return questions[0]?.section ?? "english";
  }, [questions]);

  // Shuffle options once on mount
  const shuffledQuestions: ShuffledSatQuestion[] = useMemo(() => {
    return questions.map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options),
    }));
  }, [questions]);

  // Group by stage only (section is fixed)
  const stageMap = useMemo(() => {
    const map: Record<SatStage, ShuffledSatQuestion[]> = {
      foundation: [],
      sat: [],
      advanced: [],
    };
    for (const q of shuffledQuestions) {
      map[q.stage].push(q);
    }
    return map;
  }, [shuffledQuestions]);

  const currentSatStage = stages[currentStageIndex];
  const currentStageQuestions = stageMap[currentSatStage];
  const totalPages = Math.ceil(currentStageQuestions.length / questionsPerPage);

  const currentPageQuestions = useMemo(() => {
    const start = currentPage * questionsPerPage;
    return currentStageQuestions.slice(start, start + questionsPerPage);
  }, [currentPage, currentStageQuestions, questionsPerPage]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelect(questionId: number, option: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setPageError("");
  }

  function allCurrentPageAnswered() {
    return currentPageQuestions.every((q) => answers[q.id] !== undefined);
  }

  function calculateStageScore(stage: SatStage) {
    return stageMap[stage].filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;
  }

  function getSectionBand(): string {
    const fScore = calculateStageScore("foundation");
    const sScore = calculateStageScore("sat");
    const aScore = calculateStageScore("advanced");
    if (fScore < passMarkPerStage) return "Foundation";
    if (sScore < passMarkPerStage) return "SAT";
    if (aScore >= passMarkPerStage) return "Advanced";
    return "SAT";
  }

  function buildResultAndNavigate(options?: { timeUp?: boolean }) {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const band = getSectionBand();
    const totalCorrect = shuffledQuestions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const fScore = calculateStageScore("foundation");
    const sScore = calculateStageScore("sat");
    const aScore = calculateStageScore("advanced");

    const params = new URLSearchParams({
      test: "sat",
      score: String(totalCorrect),
      total: String(shuffledQuestions.length),
      band,
      message: bandMessages[band],
      passMark: String(passMarkPerStage),
      timeUp: options?.timeUp ? "true" : "false",
    });

    // Pass scores under the right section key
    if (currentSection === "english") {
      params.set("englishBand", band);
      params.set("engFoundation", String(fScore));
      params.set("engFoundationTotal", String(stageMap.foundation.length));
      params.set("engSat", String(sScore));
      params.set("engSatTotal", String(stageMap.sat.length));
      params.set("engAdvanced", String(aScore));
      params.set("engAdvancedTotal", String(stageMap.advanced.length));
    } else {
      params.set("mathBand", band);
      params.set("mthFoundation", String(fScore));
      params.set("mthFoundationTotal", String(stageMap.foundation.length));
      params.set("mthSat", String(sScore));
      params.set("mthSatTotal", String(stageMap.sat.length));
      params.set("mthAdvanced", String(aScore));
      params.set("mthAdvancedTotal", String(stageMap.advanced.length));
    }

    router.push(`/result?${params.toString()}`);
  }

  // Timer
  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;
    if (timeLeft <= 0) {
      buildResultAndNavigate({ timeUp: true });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hasStarted, timeLeft]);

  // Warn on leave
  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasStarted]);

  function goNext() {
    if (!allCurrentPageAnswered()) {
      setPageError("Please answer all questions on this page before continuing.");
      return;
    }

    // More pages in this stage
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setPageError("");
      scrollToTop();
      return;
    }

    // End of stage — check gate
    const stageScore = calculateStageScore(currentSatStage);
    const isLastStage = currentStageIndex === stages.length - 1;

    // Failed gate → immediate result
    if (stageScore < passMarkPerStage) {
      buildResultAndNavigate();
      return;
    }

    // Passed last stage → finished
    if (isLastStage) {
      buildResultAndNavigate();
      return;
    }

    // Passed, not last stage → advance
    setCurrentStageIndex((prev) => prev + 1);
    setCurrentPage(0);
    setPageError("");
    scrollToTop();
  }

  function goBack() {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setPageError("");
      scrollToTop();
    }
  }

  const currentStageAnsweredCount = currentStageQuestions.filter(
    (q) => answers[q.id] !== undefined
  ).length;

  const overallAnsweredCount = Object.keys(answers).length;
  const isLastPage = currentPage === totalPages - 1;
  const isLastStage = currentStageIndex === stages.length - 1;
  const isFinishButton = isLastPage && isLastStage;

  // ── Start screen ────────────────────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#16345C]">
            Instructions
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">
            SAT Placement Test · {sectionTitle}
          </h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Questions", value: String(shuffledQuestions.length) },
              { label: "Time Limit", value: "25:00" },
              { label: "Stages", value: "Foundation → SAT → Advanced" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-[#0B1F3A]">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              <li>• This section has 3 stages: Foundation, SAT, and Advanced (10 questions each).</li>
              <li>• You need at least <strong>{passMarkPerStage} out of 10</strong> to advance to the next stage.</li>
              <li>• If you score below {passMarkPerStage}, the test stops and your result is shown immediately.</li>
              <li>• You can go back and change answers within the current stage.</li>
              <li>• The timer starts when you click &quot;Start Test&quot; and covers this section only.</li>
              <li>• If time runs out, your test will be submitted automatically.</li>
            </ul>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => { setHasStarted(true); scrollToTop(); }}
              className="rounded-xl bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
            >
              Start Test
            </button>
          </div>
        </section>
      </main>
    );
  }

  // ── Test screen ─────────────────────────────────────────────────────────────
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#16345C]">
              SAT Placement Test · {sectionTitle}
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-[#0B1F3A]">
              {stageTitles[currentSatStage]}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Score at least {passMarkPerStage} out of {currentStageQuestions.length} to advance.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <p>Time left: <span className="font-semibold text-[#0B1F3A]">{formatTime(timeLeft)}</span></p>
            <p className="mt-1">Stage <span className="font-semibold text-[#0B1F3A]">{currentStageIndex + 1}</span> of <span className="font-semibold text-[#0B1F3A]">3</span></p>
            <p className="mt-1">Page <span className="font-semibold text-[#0B1F3A]">{currentPage + 1}</span> of <span className="font-semibold text-[#0B1F3A]">{totalPages}</span></p>
            <p className="mt-1">Stage answered: <span className="font-semibold text-[#0B1F3A]">{currentStageAnsweredCount}</span> / <span className="font-semibold text-[#0B1F3A]">{currentStageQuestions.length}</span></p>
            <p className="mt-1">Overall: <span className="font-semibold text-[#0B1F3A]">{overallAnsweredCount}</span> / <span className="font-semibold text-[#0B1F3A]">{shuffledQuestions.length}</span></p>
          </div>
        </div>

        {/* Stage progress */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            {stages.map((stage, idx) => {
              const state =
                idx < currentStageIndex ? "done"
                : idx === currentStageIndex ? "active"
                : "locked";
              return (
                <div key={stage} className="flex items-center gap-2">
                  <div className={`inline-flex h-7 w-20 items-center justify-center rounded-full text-xs font-semibold leading-none transition ${
                    state === "done"
                      ? "bg-green-500 text-white"
                      : state === "active"
                      ? "bg-[#0B1F3A] text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}>
                    {state === "done" ? "✓ " : ""}{stageTitles[stage]}
                  </div>
                  {idx < stages.length - 1 && (
                    <div className={`h-0.5 w-4 rounded-full ${state === "done" ? "bg-green-500" : "bg-slate-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Page progress bar */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#0B1F3A] transition-all"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          />
        </div>

        {/* Error */}
        {pageError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {pageError}
          </div>
        )}

        {/* Questions */}
        <div className="mt-8 space-y-8">
          {currentPageQuestions.map((question, index) => {
            const localNumber = currentPage * questionsPerPage + index + 1;
            const selectedAnswer = answers[question.id];
            return (
              <div key={question.id} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#16345C]">
                  Question {localNumber}
                </p>
                <p className="mt-2 whitespace-pre-line text-lg font-medium leading-7 text-[#0B1F3A]">
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

        {/* Navigation */}
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
            {isFinishButton
              ? "Finish Test"
              : isLastPage && isLastStage
              ? "Next Section →"
              : isLastPage
              ? "Check Stage"
              : "Next"}
          </button>
        </div>
      </div>
    </main>
  );
}
