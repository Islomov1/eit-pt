import Link from "next/link";

type ResultPageProps = {
  searchParams: Promise<{
    test?: string;
    score?: string;
    total?: string;
    band?: string;
    message?: string;
    timeUp?: string;
    englishBand?: string;
    mathBand?: string;
    engFoundation?: string;
    engFoundationTotal?: string;
    engSat?: string;
    engSatTotal?: string;
    engAdvanced?: string;
    engAdvancedTotal?: string;
    mthFoundation?: string;
    mthFoundationTotal?: string;
    mthSat?: string;
    mthSatTotal?: string;
    mthAdvanced?: string;
    mthAdvancedTotal?: string;
    passMark?: string;
  }>;
};

function ScoreRow({
  label,
  correct,
  total,
  passMark,
}: {
  label: string;
  correct: number;
  total: number;
  passMark: number;
}) {
  const wrong = total - correct;
  const passed = correct >= passMark;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-slate-700">{label}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
          passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {passed ? "Passed" : "Failed"}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-semibold text-green-600">✓ {correct} correct</span>
        <span className="text-slate-300">|</span>
        <span className="font-semibold text-red-500">✗ {wrong} wrong</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500">{correct} / {total}</span>
      </div>
    </div>
  );
}

function BandBadge({ label, band }: { label: string; band: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#0B1F3A]">{band}</p>
    </div>
  );
}

// A stage was attempted if its total questions > 0 AND
// it was either the first stage, or the previous stage was passed
function getAttemptedStages(
  scores: number[],
  totals: number[],
  passMark: number
): boolean[] {
  return scores.map((score, i) => {
    if (totals[i] === 0) return false;           // no questions sent = not taken
    if (i === 0) return true;                    // foundation always attempted if questions exist
    return scores[i - 1] >= passMark;            // only attempted if previous stage passed
  });
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;

  const test = params.test ?? "english";
  const score = parseInt(params.score ?? "0");
  const total = parseInt(params.total ?? "0");
  const wrong = total - score;
  const band = params.band ?? "N/A";
  const message = params.message ?? "No result message was provided.";
  const timeUp = params.timeUp === "true";
  const passMark = parseInt(params.passMark ?? "7");

  const englishBand = params.englishBand ?? null;
  const mathBand = params.mathBand ?? null;

  const engF  = parseInt(params.engFoundation ?? "0");
  const engFT = parseInt(params.engFoundationTotal ?? "0");
  const engS  = parseInt(params.engSat ?? "0");
  const engST = parseInt(params.engSatTotal ?? "0");
  const engA  = parseInt(params.engAdvanced ?? "0");
  const engAT = parseInt(params.engAdvancedTotal ?? "0");

  const mthF  = parseInt(params.mthFoundation ?? "0");
  const mthFT = parseInt(params.mthFoundationTotal ?? "0");
  const mthS  = parseInt(params.mthSat ?? "0");
  const mthST = parseInt(params.mthSatTotal ?? "0");
  const mthA  = parseInt(params.mthAdvanced ?? "0");
  const mthAT = parseInt(params.mthAdvancedTotal ?? "0");

  const engAttempted = getAttemptedStages([engF, engS, engA], [engFT, engST, engAT], passMark);
  const mthAttempted = getAttemptedStages([mthF, mthS, mthA], [mthFT, mthST, mthAT], passMark);

  const engTaken = engFT > 0;
  const mthTaken = mthFT > 0;
  const bothTaken = engTaken && mthTaken;

  const testTitle = test === "english" ? "English Placement Test" : "SAT Placement Test";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#16345C]">Result</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">{testTitle}</h1>

        {timeUp && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-medium text-amber-800">
            Time is up. Your test was submitted automatically.
          </div>
        )}

        {/* ── ENGLISH PLACEMENT TEST ─────────────────────────────────── */}
        {test === "english" && (
          <>
            <div className="mt-8 rounded-2xl bg-[#0B1F3A] p-6 text-white">
              <p className="text-sm uppercase tracking-[0.16em] text-white/75">Your Level</p>
              <p className="mt-2 text-5xl font-bold">{band}</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Correct</p>
                <p className="mt-1 text-2xl font-bold text-green-600">{score}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Wrong</p>
                <p className="mt-1 text-2xl font-bold text-red-500">{wrong}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total</p>
                <p className="mt-1 text-2xl font-bold text-[#0B1F3A]">{total}</p>
              </div>
            </div>
            <p className="mt-6 text-base leading-8 text-slate-700">{message}</p>
          </>
        )}

        {/* ── SAT TEST ───────────────────────────────────────────────── */}
        {test === "sat" && (
          <>
            {/* Overall band */}
            <div className="mt-8 rounded-2xl bg-[#0B1F3A] p-6 text-white">
              <p className="text-sm uppercase tracking-[0.16em] text-white/75">
                {bothTaken ? "Overall Band" : engTaken ? "English Band" : "Math Band"}
              </p>
              <p className="mt-2 text-5xl font-bold">{band}</p>
            </div>

            {/* Section bands — only when both sections taken */}
            {bothTaken && englishBand && mathBand && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <BandBadge label="English Band" band={englishBand} />
                <BandBadge label="Math Band" band={mathBand} />
              </div>
            )}

            {/* Score summary */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Correct</p>
                <p className="mt-1 text-2xl font-bold text-green-600">{score}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Wrong</p>
                <p className="mt-1 text-2xl font-bold text-red-500">{wrong}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total</p>
                <p className="mt-1 text-2xl font-bold text-[#0B1F3A]">{total}</p>
              </div>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-700">{message}</p>

            {/* English breakdown */}
            {engTaken && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#0B1F3A]">English Breakdown</h2>
                <div className="mt-3 space-y-2">
                  {engAttempted[0] && <ScoreRow label="Foundation" correct={engF} total={engFT} passMark={passMark} />}
                  {engAttempted[1] && <ScoreRow label="SAT"        correct={engS} total={engST} passMark={passMark} />}
                  {engAttempted[2] && <ScoreRow label="Advanced"   correct={engA} total={engAT} passMark={passMark} />}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Pass mark per stage: <span className="font-semibold text-[#0B1F3A]">{passMark} / 10</span>
                </p>
              </div>
            )}

            {/* Math breakdown */}
            {mthTaken && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-[#0B1F3A]">Math Breakdown</h2>
                <div className="mt-3 space-y-2">
                  {mthAttempted[0] && <ScoreRow label="Foundation" correct={mthF} total={mthFT} passMark={passMark} />}
                  {mthAttempted[1] && <ScoreRow label="SAT"        correct={mthS} total={mthST} passMark={passMark} />}
                  {mthAttempted[2] && <ScoreRow label="Advanced"   correct={mthA} total={mthAT} passMark={passMark} />}
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Pass mark per stage: <span className="font-semibold text-[#0B1F3A]">{passMark} / 10</span>
                </p>
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
          >
            Back to Home
          </Link>
          <Link
            href={test === "english" ? "/test/english" : "/test/sat"}
            className="rounded-xl border border-[#0B1F3A] px-5 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:bg-slate-50"
          >
            Retake Test
          </Link>
        </div>

      </section>
    </main>
  );
}
