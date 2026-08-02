import Breadcrumbs from "@/components/Breadcrumbs";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";

const title = "How it works";
const description =
  "See how Syntex translates KYB documents across vendor formats and routes them to all your infrastructure partners automatically.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "How it works", path: "/how-it-works" }]} />
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
