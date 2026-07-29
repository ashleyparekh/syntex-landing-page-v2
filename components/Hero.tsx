"use client";

import dynamic from "next/dynamic";
import RequestAccessButton from "@/components/RequestAccessButton";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    <div
      className="flex aspect-square w-full items-center justify-center"
      aria-hidden
    >
      <span className="font-display text-sm text-fog">Loading globe…</span>
    </div>
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] bg-ink">
      <div className="section-pad relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col gap-8 pt-24 pb-10 md:grid md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:items-center md:gap-6 md:pt-20 md:pb-10">
        <div className="relative z-10 max-w-md shrink-0">
          <p className="font-display text-xs tracking-[0.2em] text-mist sm:text-sm">
            SYNTEX
          </p>
          <h1 className="mt-3 font-display text-xl tracking-tight text-paper sm:text-2xl md:text-[1.65rem] md:leading-snug lg:text-[1.85rem]">
            AI-native KYB orchestration for cross-border stablecoin payments
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-mist md:text-[0.95rem]">
            Translate KYB documents across vendor formats and route them to
            every infrastructure partner from one input.
          </p>
          <div className="mt-6">
            <RequestAccessButton />
          </div>
          <p className="mt-8 text-[11px] text-fog">
            Hover a country for ID and regulator context.
          </p>
        </div>

        <div className="relative flex w-full items-center justify-center md:justify-end">
          <div
            className="relative w-full max-w-[min(100%,78svh,680px)]"
            aria-label="Interactive 3D globe showing example payment corridors"
          >
            <Globe />
          </div>
        </div>
      </div>
    </section>
  );
}
