import type { Metadata } from "next";
import Solution from "@/components/Solution";
import ProductDeepDive from "@/components/ProductDeepDive";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Product — Syntex",
  description: "Explore the Syntex platform: client portal for guided document collection and banker dashboard for full onboarding visibility.",
};

export default function ProductPage() {
  return (
    <main className="pt-20">
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/40 to-midnight" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            The Syntex{" "}
            <span className="text-gradient-blue">Platform</span>
          </h1>
        </div>
      </div>
      <Solution />
      <ProductDeepDive />
      <CTA />
    </main>
  );
}
