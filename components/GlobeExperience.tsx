"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";

export type GlobeExperienceState = {
  /** 0 = sitting in hero, 1 = docked in nav */
  dockProgress: number;
  /** Parallax offset in px for text (globe uses 0.6×) */
  parallaxY: number;
  heroSlotRef: RefObject<HTMLDivElement>;
  navSlotRef: RefObject<HTMLDivElement>;
  heroSectionRef: RefObject<HTMLElement>;
  isHome: boolean;
};

const GlobeExperienceContext = createContext<GlobeExperienceState | null>(null);

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/** Approximate cubic-bezier(0.4, 0, 0.2, 1) */
export function easeStandard(t: number) {
  const c = clamp01(t);
  return c < 0.5
    ? 4 * c * c * c
    : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export function useGlobeExperience() {
  const ctx = useContext(GlobeExperienceContext);
  if (!ctx) {
    throw new Error("useGlobeExperience must be used within GlobeExperienceProvider");
  }
  return ctx;
}

export function useGlobeExperienceOptional() {
  return useContext(GlobeExperienceContext);
}

export default function GlobeExperienceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const heroSlotRef = useRef<HTMLDivElement>(null!);
  const navSlotRef = useRef<HTMLDivElement>(null!);
  const heroSectionRef = useRef<HTMLElement>(null!);

  const [dockProgress, setDockProgress] = useState(isHome ? 0 : 1);
  const [parallaxY, setParallaxY] = useState(0);

  const sync = useCallback(() => {
    if (!isHome) {
      setDockProgress(1);
      setParallaxY(0);
      return;
    }

    const hero = heroSectionRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const heroH = Math.max(rect.height, 1);
    const scrolled = clamp01(-rect.top / heroH);

    const paraT = clamp01(scrolled / 0.5);
    setParallaxY(easeStandard(paraT) * -72);

    const dockRaw = clamp01((scrolled - 0.85) / 0.35);
    setDockProgress(easeStandard(dockRaw));
  }, [isHome]);

  useEffect(() => {
    sync();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sync]);

  useEffect(() => {
    if (isHome) {
      setDockProgress(0);
      setParallaxY(0);
      requestAnimationFrame(sync);
    } else {
      setDockProgress(1);
      setParallaxY(0);
    }
  }, [isHome, sync]);

  const value = useMemo(
    () => ({
      dockProgress,
      parallaxY,
      heroSlotRef,
      navSlotRef,
      heroSectionRef,
      isHome,
    }),
    [dockProgress, parallaxY, isHome]
  );

  return (
    <GlobeExperienceContext.Provider value={value}>
      {children}
    </GlobeExperienceContext.Provider>
  );
}
