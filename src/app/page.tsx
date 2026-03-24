import TestCard from "@/components/TestCard";
import { BRAND } from "@/constants/branding";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-3xl bg-[#0B1F3A] px-6 py-12 text-white shadow-sm sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
          {BRAND.centerName}
        </p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{BRAND.siteTitle}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
          Choose a test, complete the assessment, and see your result immediately on screen.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <TestCard
          title="English Placement Test"
          description="A timed English placement test with 66 multiple-choice questions covering a range of grammar and vocabulary difficulty."
          questionCountText="66 questions • 30 minutes • A1 to C2"
          href="/test/english"
        />
        <TestCard
          title="SAT Placement Test"
          description="A timed placement test with separate English and Math sections, each gated across Foundation, SAT, and Advanced stages."
          questionCountText="30 questions per section • 25 minutes • 3 gated stages"
          href="/test/sat"
        />
      </section>
    </main>
  );
}
