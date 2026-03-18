import type { Metadata } from "next";
import Security from "@/components/Security";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Security — Syntex",
  description: "Syntex is built on enterprise-grade security infrastructure: AWS, end-to-end encryption, audit logs, and more.",
};

export default function SecurityPage() {
  return (
    <main className="pt-20">
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/40 to-midnight" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Secure by{" "}
            <span className="text-gradient-blue">Design</span>
          </h1>
          <p className="mt-4 text-silver-dark text-lg max-w-xl mx-auto leading-relaxed font-sans">
            Enterprise compliance and security baked into every layer of the platform.
          </p>
        </div>
      </div>
      <Security />
      <CTA />
    </main>
  );
}
