import type { Metadata } from "next";
import BlogArticle, { InlineLink } from "@/components/BlogArticle";
import { SITE_URL } from "@/lib/site";

const title =
  "The hidden compliance cost of adding a second infrastructure partner";
const description =
  "Every new payment partner is a new compliance stack. How time and ops cost compound when KYB vendors do not share formats.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog/hidden-cost-second-infrastructure-partner`,
    languages: {
      "en-US": `${SITE_URL}/blog/hidden-cost-second-infrastructure-partner`,
    },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/blog/hidden-cost-second-infrastructure-partner`,
    type: "article",
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <main>
      <BlogArticle slug="hidden-cost-second-infrastructure-partner" title={title} date="May 28, 2026" category="Operations">
        <p>
          Product and partnerships treat a new infrastructure partner as a
          technical integration: APIs, webhooks, sandbox keys, go-live. The
          compliance cost arrives later, usually as a surprise. Every new partner
          is also a new KYB vendor relationship, a new package format, and a new
          queue of exceptions for your ops team.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          The second partner is not 2x the first
        </h2>
        <p>
          With one partner, you can afford a bespoke export. Someone on ops
          learns the vendor portal. Templates stabilize. With a second partner,
          you do not double a linear workload. You add a translation surface
          between two systems that were never designed to agree. Every client
          that must clear both partners needs two outputs from one evidence set.
        </p>
        <p>
          A third partner does not add one more portal. It adds two more
          pairwise mappings if you keep solving the problem with custom code:
          A↔B, A↔C, B↔C. Teams feel this as &quot;we shipped the integration but
          onboarding got slower.&quot;
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          Where the time goes
        </h2>
        <p>
          Count the hours honestly. Initial mapping of fields and document types:
          days to weeks per partner. Per-client reformatting when a vendor
          rejects a file another vendor accepted: 30 to 90 minutes of skilled ops
          time, often more when the client must reshoot an ID. Escalations for
          foreign IDs and entity structures: multi-day threads. Engineering time
          to maintain brittle transformers when a vendor changes a required
          field: recurring and unplanned.
        </p>
        <p>
          If you clear 40 multi-partner clients a month and half need a manual
          patch at roughly an hour each, that is a full week of ops capacity
          before you count partner calls. That is the quiet tax of vendor
          fragmentation described on our{" "}
          <InlineLink href="/the-gap">The Gap page</InlineLink>.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          The opportunity cost
        </h2>
        <p>
          Time spent translating packages is time not spent on corridor
          expansion, credit policy, or client experience. Sales promises a new
          rail. Compliance becomes the critical path. Founders interpret that as
          a hiring problem and add ops headcount. Sometimes hiring is right.
          Often the system design is wrong: you are paying humans to be an API
          between KYB vendors.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          A better cost model
        </h2>
        <p>
          Price partner expansion as compliance surface area, not only as
          engineering story points. Ask: how many KYB vendors does this partner
          introduce? Do they accept packages we already produce? What is the
          median time from first submit to clear for a non-US ID? If the answers
          are ugly, fix orchestration before you add the fifth rail.
        </p>
        <p>
          Syntex is the layer that makes that second partner not cost you a
          compliance rebuild.
        </p>
      </BlogArticle>
    </main>
  );
}
