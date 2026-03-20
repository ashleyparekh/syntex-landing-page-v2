import type { Metadata } from "next";
import Features from "@/components/Features";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Features — Syntex",
  description: "Discover how Syntex automates document collection, follow-ups, pre-qualification, and onboarding tracking for banks.",
};

export default function FeaturesPage() {
  return (
    <main className="pt-20">
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 bg-white" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Built to{" "}
            <span className="text-gradient-blue">Move Faster</span>
          </h1>
          <p className="mt-4 text-silver-dark text-lg max-w-xl mx-auto leading-relaxed font-sans">
            Every feature designed to eliminate delays in commercial banking onboarding.
          </p>
        </div>
      </div>
      <Features />
      <Impact />
      <CTA />
    </main>
  );
}
