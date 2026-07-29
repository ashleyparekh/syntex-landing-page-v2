import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Corridors from "@/components/Corridors";
import CTA from "@/components/CTA";
import { SITE_URL } from "@/lib/site";

const title = "Example corridors";
const description =
  "Syntex works across any cross-border corridor. Examples mapped in depth: US–India (Aadhaar, RBI), US–Mexico (CURP, CNBV), US–Philippines (PhilSys, BSP).";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/corridors`,
    languages: { "en-US": `${SITE_URL}/corridors` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/corridors`,
    type: "website",
    locale: "en_US",
  },
};

export default function CorridorsPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "Example corridors" }]} />
      <div className="section-pad mx-auto max-w-5xl pb-0 pt-8 md:pt-12">
        <h1 className="font-display text-3xl text-paper md:text-5xl">
          Example corridors
        </h1>
      </div>
      <Corridors showHeading={false} />
      <CTA />
    </main>
  );
}
