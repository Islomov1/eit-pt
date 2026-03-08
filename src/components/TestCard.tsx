import Link from "next/link";

type TestCardProps = {
  title: string;
  description: string;
  questionCountText: string;
  href: string;
};

export default function TestCard({
  title,
  description,
  questionCountText,
  href,
}: TestCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h2 className="text-2xl font-semibold text-[#0B1F3A]">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <p className="mt-4 text-sm font-medium text-[#16345C]">{questionCountText}</p>

      <Link
        href={href}
        className="mt-6 inline-flex rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16345C]"
      >
        Start Test
      </Link>
    </div>
  );
}