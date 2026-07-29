"use client";

import RequestAccessButton from "@/components/RequestAccessButton";
import { useGlobeExperience } from "@/components/GlobeExperience";

export default function Hero() {
  const { heroSectionRef, heroSlotRef, parallaxY } = useGlobeExperience();

  return (
    <section
      ref={heroSectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* Globe — dominant visual plane */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center md:justify-end md:pr-6 lg:pr-14 xl:pr-20">
        <div
          ref={heroSlotRef}
          className="pointer-events-auto relative aspect-square w-[min(92vw,78svh,720px)]"
          aria-label="Interactive 3D globe showing example payment corridors"
        />
      </div>

      {/* Text zones — pointer-events-none so globe hover works underneath */}
      <div className="section-pad pointer-events-none relative z-[70] mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-between pt-28 pb-12 md:pt-32 md:pb-16">
        {/* Zone 1 — top left: stacked typographic sandwich */}
        <h1
          className="hero-tagline"
          style={{
            transform: `translate3d(0, ${parallaxY * 0.35}px, 0)`,
            transition: "transform 80ms linear",
          }}
        >
          <span className="hero-tagline__sans">KYB</span>
          <span className="hero-tagline__serif">without</span>
          <span className="hero-tagline__sans">borders.</span>
        </h1>

        {/* Zone 2 — bottom left caption */}
        <div
          className="max-w-md will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0)`,
            transition: "transform 80ms linear",
          }}
        >
          <p className="font-display text-base leading-snug tracking-tight text-paper md:text-lg">
            AI-native KYB orchestration for cross-border stablecoin payments.
          </p>
          <p className="mt-2 font-display text-sm leading-relaxed text-[#999] md:text-[0.95rem]">
            Translate KYB documents across vendor formats and route them to
            every infrastructure partner from one input.
          </p>
          <div className="pointer-events-auto mt-5">
            <RequestAccessButton />
          </div>
        </div>
      </div>
    </section>
  );
}
