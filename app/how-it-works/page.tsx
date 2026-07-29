import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import { SITE_URL } from "@/lib/site";

const title = "How it works";
const description =
  "Receive documents you already have, translate them across KYB vendor formats, and route packages to every infrastructure partner from one input.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/how-it-works`,
    languages: { "en-US": `${SITE_URL}/how-it-works` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/how-it-works`,
    type: "website",
    locale: "en_US",
  },
};

export default function HowItWorksPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "How it works" }]} />
      <div className="section-pad mx-auto max-w-5xl pb-4">
        <h1 className="font-display text-3xl text-paper md:text-5xl">
          How it works
        </h1>
        <p className="mt-4 max-w-2xl text-base text-mist">
          Receive. Translate. Route. One input clears every partner.
        </p>
      </div>
      <HowItWorks showHeading={false} />
      <CTA />
    </main>
  );
}
