import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Problem from "@/components/Problem";
import FAQ, { problemFaqs } from "@/components/FAQ";
import CTA from "@/components/CTA";
import { SITE_URL } from "@/lib/site";

const title = "The Gap";
const description =
  "Cross-border stablecoin payment companies clear the same client through multiple infrastructure partners, each with a different KYB vendor. Formats do not match. Teams rebuild translation code for every pair.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/the-gap`,
    languages: { "en-US": `${SITE_URL}/the-gap` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/the-gap`,
    type: "website",
    locale: "en_US",
  },
};

export default function TheGapPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "The Gap" }]} />
      <div className="section-pad mx-auto max-w-5xl pb-6">
        <h1 className="font-display text-3xl text-paper md:text-5xl">
          The Gap
        </h1>
        <p className="mt-4 max-w-2xl text-base text-mist">
          Same client. Multiple partners. Different KYB vendors. No shared
          document format.
        </p>
      </div>
      <Problem showHeading={false} />
      <FAQ items={problemFaqs} title="The Gap FAQs" />
      <CTA />
    </main>
  );
}
