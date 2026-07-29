"use client";

import RequestAccessButton from "@/components/RequestAccessButton";
import { useGlobeExperience } from "@/components/GlobeExperience";

export default function Hero() {
  const { heroSectionRef, heroSlotRef, parallaxY } = useGlobeExperience();

  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-x-clip bg-ink md:block"
    >
      {/* Zone 1 — title: stacked above globe on mobile, top-left overlay on desktop */}
      <div className="section-pad relative z-10 order-1 shrink-0 pt-24 md:pointer-events-none md:absolute md:inset-x-0 md:top-0 md:z-[70] md:pt-32">
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
      </div>

      {/* Globe — between title and caption on mobile; right-side plane on desktop */}
      <div className="pointer-events-none relative z-0 order-2 flex min-h-0 flex-1 items-center justify-center px-4 py-2 md:absolute md:inset-0 md:justify-end md:px-0 md:py-0 md:pr-2 lg:pr-6 xl:pr-10">
        <div
          ref={heroSlotRef}
          className="pointer-events-auto relative aspect-square w-[min(88vw,46svh)] md:w-[min(96vw,88svh,864px)]"
          aria-label="Interactive 3D globe showing example payment corridors"
        />
      </div>

      {/* Zone 2 — caption + CTA: below globe on mobile, bottom-left overlay on desktop */}
      <div className="section-pad relative z-10 order-3 shrink-0 pb-10 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:z-[70] md:pb-16">
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
