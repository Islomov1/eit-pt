"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Band, Question, TestType } from "@/types/test";
import { calculateScore, getBand } from "@/utils/scoring";
import { shuffleArray } from "@/utils/shuffle";

type TestShellProps = {
  testType: TestType;
  title: string;
  questions: Question[];
  bands: Band[];
  questionsPerPage: number;
};

type ShuffledQuestion = Question & {
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
  bands,
  questionsPerPage,
}: TestShellProps) {
  const router = useRouter();

  const [hasStarted, setHasStarted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [pageError, setPageError] = useState("");
  const [timeLeft, setTimeLeft] = useState(TEST_TIME_LIMITS[testType]);

  const hasFinishedRef = useRef(false);

  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    return questions.map((question) => ({
      ...question,
      shuffledOptions: shuffleArray(question.options),
    }));
  }, [questions]);

  const totalPages = Math.ceil(shuffledQuestions.length / questionsPerPage);

  const currentQuestions = useMemo(() => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return shuffledQuestions.slice(start, end);
  }, [currentPage, shuffledQuestions, questionsPerPage]);

  const answeredCount = Object.keys(answers).length;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishTest(options?: { timeUp?: boolean }) {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const score = calculateScore(answers, shuffledQuestions);
    const band = getBand(score, bands);

    const params = new URLSearchParams({
      test: testType,
      score: String(score),
      total: String(shuffledQuestions.length),
      band: band.label,
      message: band.message,
      timeUp: options?.timeUp ? "true" : "false",
    });

    router.push(`/result?${params.toString()}`);
  }

  useEffect(() => {
    if (!hasStarted || hasFinishedRef.current) return;

    if (timeLeft <= 0) {
      finishTest({ timeUp: true });
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
  }, [hasStarted, timeLeft]);

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

  function handleSelect(questionId: number, option: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
    setPageError("");
  }

  function allCurrentQuestionsAnswered() {
    return currentQuestions.every((question) => answers[question.id] !== undefined);
  }

  function goNext() {
    if (!allCurrentQuestionsAnswered()) {
      setPageError("Please answer all questions on this page before continuing.");
      return;
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
      setPageError("");
      scrollToTop();
    }
  }

  function goBack() {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      setPageError("");
      scrollToTop();
    }
  }

  function handleSubmit() {
    if (!allCurrentQuestionsAnswered()) {
      setPageError("Please answer all questions on this page before submitting.");
      return;
    }

    finishTest();
  }

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
              <p className="text-sm text-slate-500">Questions Per Page</p>
              <p className="mt-2 text-2xl font-semibold text-[#0B1F3A]">
                {questionsPerPage}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-3 text-sm leading-7 text-slate-700">
              <li>• Read each question carefully before choosing your answer.</li>
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
              Test
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-[#0B1F3A]">{title}</h1>
          </div>

          <div className="text-sm text-slate-600">
            <p>
              Time left:{" "}
              <span className="font-semibold text-[#0B1F3A]">{formatTime(timeLeft)}</span>
            </p>
            <p className="mt-1">
              Page <span className="font-semibold text-[#0B1F3A]">{currentPage + 1}</span> of{" "}
              <span className="font-semibold text-[#0B1F3A]">{totalPages}</span>
            </p>
            <p className="mt-1">
              Answered: <span className="font-semibold text-[#0B1F3A]">{answeredCount}</span> /{" "}
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
            const globalQuestionNumber = currentPage * questionsPerPage + index + 1;
            const selectedAnswer = answers[question.id];

            return (
              <div key={question.id} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#16345C]">
                  Question {globalQuestionNumber}
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

          {currentPage < totalPages - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>
    </main>
  );
}