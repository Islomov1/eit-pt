import Link from "next/link";

type ResultPageProps = {
  searchParams: Promise<{
    test?: string;
    score?: string;
    total?: string;
    band?: string;
    message?: string;
    timeUp?: string;
    stoppedAt?: string;
    foundationScore?: string;
    foundationTotal?: string;
    satScore?: string;
    satTotal?: string;
    advancedScore?: string;
    advancedTotal?: string;
    passMark?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;

  const test = params.test;
  const score = params.score;
  const total = params.total;
  const band = params.band;
  const message = params.message;
  const timeUp = params.timeUp === "true";

  const stoppedAt = params.stoppedAt;
  const foundationScore = params.foundationScore;
  const foundationTotal = params.foundationTotal;
  const satScore = params.satScore;
  const satTotal = params.satTotal;
  const advancedScore = params.advancedScore;
  const advancedTotal = params.advancedTotal;
  const passMark = params.passMark;

  const testTitle =
    test === "english"
      ? "English Placement Test"
      : test === "sat"
      ? "SAT Placement Test"
      : "Placement Test";

  const stoppedAtLabel =
    stoppedAt === "foundation"
      ? "Foundation"
      : stoppedAt === "sat"
      ? "SAT"
      : stoppedAt === "advanced"
      ? "Advanced SAT"
      : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#16345C]">
          Result
        </p>

        <h1 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">
          {testTitle}
        </h1>

        {timeUp && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-medium text-amber-800">
            Time is up. Your test was submitted automatically.
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-[#0B1F3A] p-6 text-white">
          <p className="text-sm uppercase tracking-[0.16em] text-white/75">Your Result</p>
          <p className="mt-2 text-4xl font-bold sm:text-5xl">{band ?? "N/A"}</p>
        </div>

        <div className="mt-6 space-y-3 text-slate-700">
          <p className="text-lg leading-8">{message ?? "No result message was provided."}</p>
          <p className="text-sm font-medium text-[#16345C]">
            Score: {score ?? "0"} / {total ?? "0"}
          </p>
        </div>

        {test === "sat" && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-[#0B1F3A]">Stage Breakdown</h2>

            <div className="mt-4 grid gap-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-medium text-slate-700">Foundation</span>
                <span className="font-semibold text-[#0B1F3A]">
                  {foundationScore ?? "0"} / {foundationTotal ?? "15"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-medium text-slate-700">SAT</span>
                <span className="font-semibold text-[#0B1F3A]">
                  {satScore ?? "0"} / {satTotal ?? "15"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <span className="font-medium text-slate-700">Advanced SAT</span>
                <span className="font-semibold text-[#0B1F3A]">
                  {advancedScore ?? "0"} / {advancedTotal ?? "15"}
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p>
                Pass mark per stage:{" "}
                <span className="font-semibold text-[#0B1F3A]">{passMark ?? "9"} / 15</span>
              </p>
              {stoppedAtLabel && (
                <p>
                  Highest stage reached:{" "}
                  <span className="font-semibold text-[#0B1F3A]">{stoppedAtLabel}</span>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
          >
            Back to Home
          </Link>

          <Link
            href={test === "english" ? "/test/english" : "/test/sat"}
            className="rounded-xl border border-[#0B1F3A] px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition"
          >
            Retake Test
          </Link>
        </div>
      </section>
    </main>
  );
}