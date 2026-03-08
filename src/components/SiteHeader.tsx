import { BRAND } from "@/constants/branding";
import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-[#0B1F3A] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white p-1">
            <Image
              src="/logo.png"
              alt="Excellence in Teaching logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-base">
              {BRAND.centerName}
            </p>
            <p className="text-xs text-white/70 sm:text-sm">{BRAND.siteTitle}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}