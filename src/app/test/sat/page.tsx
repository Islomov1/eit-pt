import Link from "next/link";

export default function SatLandingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#16345C]">
          SAT Placement Test
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">
          Choose a Section
        </h1>
        <p className="mt-4 text-slate-600 leading-7">
          You can take the full SAT placement test by completing both sections, or focus on one section at a time.
          Each section is independently gated — Foundation → SAT → Advanced — and you need at least 7 out of 10 to advance.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* English Section */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#16345C]">Section 1</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">English</h2>
              <p className="mt-3 text-sm text-slate-600 leading-6">
                Reading comprehension, grammar, rhetoric, and evidence-based writing.
                30 questions across 3 stages.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B1F3A]" />
                  Foundation · SAT · Advanced
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B1F3A]" />
                  10 questions per stage
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B1F3A]" />
                  Pass mark: 7 / 10
                </li>
              </ul>
            </div>
            <Link
              href="/test/sat/english"
              className="inline-block rounded-xl bg-[#0B1F3A] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#16345C]"
            >
              Start English Section
            </Link>
          </div>

          {/* Math Section */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#16345C]">Section 2</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Math</h2>
              <p className="mt-3 text-sm text-slate-600 leading-6">
                Algebra, quadratics, statistics, geometry, and trigonometry.
                30 questions across 3 stages.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B1F3A]" />
                  Foundation · SAT · Advanced
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B1F3A]" />
                  10 questions per stage
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0B1F3A]" />
                  Pass mark: 7 / 10
                </li>
              </ul>
            </div>
            <Link
              href="/test/sat/math"
              className="inline-block rounded-xl bg-[#0B1F3A] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#16345C]"
            >
              Start Math Section
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
