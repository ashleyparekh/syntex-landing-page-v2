import Breadcrumbs from "@/components/Breadcrumbs";
import Problem from "@/components/Problem";
import FAQ, { problemFaqs } from "@/components/FAQ";
import CTA from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";

const title = "The Gap";
const description =
  "KYB breaks at the border. Every infrastructure partner runs its own verification vendor. Syntex is the layer that connects them.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/the-gap",
});

export default function TheGapPage() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "The Gap", path: "/the-gap" }]} />
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
