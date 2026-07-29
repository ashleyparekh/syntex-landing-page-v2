"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGlobeExperience } from "@/components/GlobeExperience";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => null,
});

/**
 * Home-page hero globe only. The nav always has its own mini globe (NavGlobe).
 * On scroll past the hero, this instance fades out.
 */
export default function GlobeHost() {
  const { dockProgress, parallaxY, heroSlotRef, isHome } = useGlobeExperience();

  const shellRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef(dockProgress);
  const parallaxRef = useRef(parallaxY);
  const isHomeRef = useRef(isHome);
  const [booted, setBooted] = useState(false);

  dockRef.current = dockProgress;
  parallaxRef.current = parallaxY;
  isHomeRef.current = isHome;

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    let raf = 0;
    let hasBooted = false;
    const place = () => {
      const home = isHomeRef.current;
      if (!home) {
        shell.style.opacity = "0";
        shell.style.pointerEvents = "none";
        shell.style.transform = "translate3d(-9999px,-9999px,0)";
        raf = requestAnimationFrame(place);
        return;
      }

      const hero = heroSlotRef.current;
      const heroRect = hero?.getBoundingClientRect();
      if (!heroRect || heroRect.width < 40) {
        raf = requestAnimationFrame(place);
        return;
      }

      const t = dockRef.current;
      const left = heroRect.left;
      const top = heroRect.top + parallaxRef.current * 0.6;
      const size = heroRect.width;

      shell.style.width = `${size}px`;
      shell.style.height = `${size}px`;
      shell.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      // Fade out as the page scrolls past the hero
      shell.style.opacity = String(Math.max(0, 1 - t * 1.15));
      shell.style.zIndex = "40";
      shell.style.pointerEvents = t > 0.35 ? "none" : "auto";

      if (!hasBooted) {
        hasBooted = true;
        setBooted(true);
      }
      raf = requestAnimationFrame(place);
    };

    raf = requestAnimationFrame(place);
    return () => cancelAnimationFrame(raf);
  }, [heroSlotRef]);

  if (!isHome) return null;

  return (
    <div
      ref={shellRef}
      className="pointer-events-none fixed left-0 top-0 will-change-transform"
      style={{
        width: 1,
        height: 1,
        transform: "translate3d(-9999px,-9999px,0)",
        zIndex: 40,
        opacity: 0,
      }}
      aria-hidden
    >
      <div className="h-full w-full">
        {booted && <Globe docked={dockProgress > 0.65} />}
      </div>
    </div>
  );
}
