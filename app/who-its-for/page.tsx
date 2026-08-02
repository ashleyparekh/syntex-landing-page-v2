import Breadcrumbs from "@/components/Breadcrumbs";
import WhoItsFor from "@/components/WhoItsFor";
import CTA from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";

const title = "Who it is for";
const description =
  "Syntex is built for US-based cross-border stablecoin payment companies across B2B ecommerce, payroll, remittance, trade finance, and gig economy platforms.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/who-its-for",
});

export default function WhoItsForPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "Who it is for", path: "/who-its-for" }]} />
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
