"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EnglishQuestion, LevelGroup, TestType } from "@/types/test";
import { shuffleArray } from "@/utils/shuffle";

type TestShellProps = {
  testType: TestType;
  title: string;
  questions: EnglishQuestion[];
  levelGroups: LevelGroup[];
  questionsPerPage: number;
};

type ShuffledQuestion = EnglishQuestion & {
  shuffledOptions: string[];
};

const TEST_TIME_LIMITS: Record<TestType, number> = {
  english: 30 * 60,
  sat: 30 * 60,
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function TestShell({
  testType,
  title,
  questions,
  levelGroups,
  questionsPerPage,
}: TestShellProps) {
  const router = useRouter();

  const [hasStarted, setHasStarted] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [pageError, setPageError] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_TIME_LIMITS[testType]);

  const hasFinishedRef = useRef(false);

  // Shuffle options once per question on mount
  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    return questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options),
    }));
  }, [questions]);

  // Group shuffled questions by cefrLevel, preserving levelGroups order
  const questionsByLevel = useMemo(() => {
    const map: Record<string, ShuffledQuestion[]> = {};
    for (const q of shuffledQuestions) {
      if (!map[q.cefrLevel]) map[q.cefrLevel] = [];
      map[q.cefrLevel].push(q);
    }
    return map;
  }, [shuffledQuestions]);

  const currentLevelGroup = levelGroups[currentLevelIndex];
  const currentLevelQuestions = questionsByLevel[currentLevelGroup.level] ?? [];
  const totalPages = Math.ceil(currentLevelQuestions.length / questionsPerPage);

  const currentPageQuestions = useMemo(() => {
    const start = currentPage * questionsPerPage;
    return currentLevelQuestions.slice(start, start + questionsPerPage);
  }, [currentPage, currentLevelQuestions, questionsPerPage]);

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

  function calculateLevelScore(levelQuestions: ShuffledQuestion[]) {
    return levelQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
  }

  function getTotalScore() {
    return shuffledQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
  }

  function finishTest(
    finalLevel: string,
    finalMessage: string,
    options?: { timeUp?: boolean }
  ) {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const params = new URLSearchParams({
      test: testType,
      score: String(getTotalScore()),
      total: String(shuffledQuestions.length),
      band: finalLevel,
      message: finalMessage,
      timeUp: options?.timeUp ? "true" : "false",
    });

    router.push(`/result?${params.toString()}`);
  }

  // Timer
  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;

    if (timeLeft <= 0) {
      const lastCompletedIndex = Math.max(0, currentLevelIndex - 1);
      const group = levelGroups[lastCompletedIndex];
      finishTest(group.level, group.message, { timeUp: true });
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

  // Warn on page leave
  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasStarted]);

  function goNext() {
    if (!allCurrentPageAnswered()) {
      setPageError("Please answer all questions on this page before continuing.");
      return;
    }

    // More pages in this level → go to next page
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setPageError("");
      scrollToTop();
      return;
    }

    // Last page of this level → check gate
    const levelScore = calculateLevelScore(currentLevelQuestions);
    const isLastLevel = currentLevelIndex === levelGroups.length - 1;
    const passed = levelScore >= currentLevelGroup.passmark;

    if (isLastLevel) {
      // C2 — completing it means C2 result
      finishTest(currentLevelGroup.level, currentLevelGroup.message);
      return;
    }

    if (!passed) {
      // Failed gate → stop here, result is THIS level
      finishTest(currentLevelGroup.level, currentLevelGroup.message);
      return;
    }

    // Passed → advance to next level
    setCurrentLevelIndex((prev) => prev + 1);
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

  const currentLevelAnsweredCount = currentLevelQuestions.filter(
    (q) => answers[q.id] !== undefined
  ).length;

  const overallAnsweredCount = Object.keys(answers).length;
  const isLastLevel = currentLevelIndex === levelGroups.length - 1;
  const isLastPage = currentPage === totalPages - 1;

  // ─── Start screen ──────────────────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#16345C]">
            Instructions
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">
            {title}
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
                {levelGroups.map((g) => g.level).join(" → ")}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              <li>• This test has 6 levels: A1, A2, B1, B2, C1, and C2.</li>
              <li>• Each level has 11 questions. You need at least 8 out of 11 to advance.</li>
              <li>• If you score below 8, the test stops and your result is shown immediately.</li>
              <li>• You can go back and change answers within the current level.</li>
              <li>• You must answer all questions on a page before continuing.</li>
              <li>• The timer starts only when you click &quot;Start Test&quot;.</li>
              <li>• If time runs out, your test will be submitted automatically.</li>
              <li>• If you refresh or leave the page during the test, your answers may be lost.</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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

  // ─── Test screen ───────────────────────────────────────────────────────────
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#16345C]">
              {title}
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-[#0B1F3A]">
              Level {currentLevelGroup.level}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Score at least {currentLevelGroup.passmark} out of {currentLevelQuestions.length} to advance to the next level.
            </p>
          </div>

          <div className="text-sm text-slate-600">
            <p>
              Time left:{" "}
              <span className="font-semibold text-[#0B1F3A]">{formatTime(timeLeft)}</span>
            </p>
            <p className="mt-1">
              Level{" "}
              <span className="font-semibold text-[#0B1F3A]">{currentLevelIndex + 1}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#0B1F3A]">{levelGroups.length}</span>
            </p>
            <p className="mt-1">
              Page{" "}
              <span className="font-semibold text-[#0B1F3A]">{currentPage + 1}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#0B1F3A]">{totalPages}</span>
            </p>
            <p className="mt-1">
              Level answered:{" "}
              <span className="font-semibold text-[#0B1F3A]">{currentLevelAnsweredCount}</span>{" "}
              /{" "}
              <span className="font-semibold text-[#0B1F3A]">{currentLevelQuestions.length}</span>
            </p>
            <p className="mt-1">
              Overall:{" "}
              <span className="font-semibold text-[#0B1F3A]">{overallAnsweredCount}</span>{" "}
              /{" "}
              <span className="font-semibold text-[#0B1F3A]">{shuffledQuestions.length}</span>
            </p>
          </div>
        </div>

        {/* Level progress dots */}
        <div className="mt-6 flex items-center gap-2">
          {levelGroups.map((group, index) => (
            <div key={group.level} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                  index < currentLevelIndex
                    ? "bg-green-500 text-white"
                    : index === currentLevelIndex
                    ? "bg-[#0B1F3A] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {index < currentLevelIndex ? "✓" : group.level}
              </div>
              {index < levelGroups.length - 1 && (
                <div
                  className={`h-0.5 w-6 rounded-full ${
                    index < currentLevelIndex ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
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
            {!isLastPage
              ? "Next"
              : isLastLevel
              ? "Finish Test"
              : "Check Level"}
          </button>
        </div>
      </div>
    </main>
  );
}
