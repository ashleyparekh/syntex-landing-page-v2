import Breadcrumbs from "@/components/Breadcrumbs";
import Corridors from "@/components/Corridors";
import CTA from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";

const title = "Example corridors";
const description =
  "Example corridors Syntex is built for — US-India (Aadhaar, RBI), US-Mexico (CURP, CNBV), US-Philippines (PhilSys, BSP), US-Nigeria (NIN, CBN), US-Brazil (CPF, Banco Central do Brasil).";

export const metadata = pageMetadata({
  title,
  description,
  path: "/corridors",
});

export default function CorridorsPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "Example corridors", path: "/corridors" }]} />
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
