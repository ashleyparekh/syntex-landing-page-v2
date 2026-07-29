import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import WhoItsFor from "@/components/WhoItsFor";
import CTA from "@/components/CTA";
import { SITE_URL } from "@/lib/site";

const title = "Who it is for";
const description =
  "Syntex is for any US-based cross-border stablecoin payment company: ecommerce, payroll, remittance, trade finance, and gig payouts. Not limited to one corridor.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/who-its-for`,
    languages: { "en-US": `${SITE_URL}/who-its-for` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/who-its-for`,
    type: "website",
    locale: "en_US",
  },
};

export default function WhoItsForPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "Who it is for" }]} />
      <div className="section-pad mx-auto max-w-5xl pb-4">
        <h1 className="font-display text-3xl text-paper md:text-5xl">
          Who Syntex is for
        </h1>
        <p className="mt-4 max-w-2xl text-base text-mist">
          US-based cross-border stablecoin payment companies across verticals.
          Corridors are examples of where these companies operate, not a limit
          on who we serve.
        </p>
      </div>
      <WhoItsFor showHeading={false} />
      <CTA />
    </main>
  );
}
