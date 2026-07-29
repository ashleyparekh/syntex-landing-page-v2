"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGlobeExperience } from "@/components/GlobeExperience";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => null,
});

/**
 * Single fixed globe that morphs from the hero slot into the nav slot.
 */
export default function GlobeHost() {
  const { dockProgress, parallaxY, heroSlotRef, navSlotRef, isHome } =
    useGlobeExperience();

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
      const nav = navSlotRef.current;
      if (!nav) {
        raf = requestAnimationFrame(place);
        return;
      }

      const home = isHomeRef.current;
      const t = home ? dockRef.current : 1;
      const hero = heroSlotRef.current;
      const navRect = nav.getBoundingClientRect();
      const heroRect = hero?.getBoundingClientRect();

      let fromLeft = navRect.left;
      let fromTop = navRect.top;
      let fromSize = Math.max(navRect.width, 30);

      if (home && heroRect && heroRect.width > 40) {
        fromLeft = heroRect.left;
        fromTop = heroRect.top + parallaxRef.current * 0.6;
        fromSize = heroRect.width;
      }

      const toLeft = navRect.left;
      const toTop = navRect.top;
      const toSize = Math.max(navRect.width || 30, 28);

      const left = fromLeft + (toLeft - fromLeft) * t;
      const top = fromTop + (toTop - fromTop) * t;
      const size = fromSize + (toSize - fromSize) * t;

      shell.style.width = `${size}px`;
      shell.style.height = `${size}px`;
      shell.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      shell.style.opacity = size < 10 ? "0" : "1";
      shell.style.pointerEvents = !home || t > 0.55 ? "none" : "auto";

      if (!hasBooted) {
        hasBooted = true;
        setBooted(true);
      }
      raf = requestAnimationFrame(place);
    };

    raf = requestAnimationFrame(place);
    return () => cancelAnimationFrame(raf);
  }, [heroSlotRef, navSlotRef]);

  return (
    <div
      ref={shellRef}
      className="fixed left-0 top-0 z-[60] will-change-transform"
      style={{
        width: 1,
        height: 1,
        transform: "translate3d(-9999px,-9999px,0)",
      }}
      aria-hidden
    >
      <div className="h-full w-full">
        {booted && <Globe docked={dockProgress > 0.7 || !isHome} />}
      </div>
    </div>
  );
}
