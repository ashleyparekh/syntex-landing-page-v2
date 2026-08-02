import BlogArticle, { InlineLink } from "@/components/BlogArticle";
import { pageMetadata } from "@/lib/seo";

const title = "Why KYB breaks at the border";
const description =
  "How vendor fragmentation forces stablecoin payment companies to rebuild compliance flows for every infrastructure partner.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/blog/why-kyb-breaks-at-the-border",
  type: "article",
});

export default function Page() {
  return (
    <main>
      <BlogArticle slug="why-kyb-breaks-at-the-border" title={title} date="July 2, 2026" category="KYB">
        <p>
          Domestic KYB is already hard. Cross-border KYB fails in a more
          specific way. The failure is not that teams forget to collect
          documents. The failure is that every infrastructure partner picks its
          own KYB vendor, those vendors do not share formats, and the payment
          company becomes the unpaid integration layer between them.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          One client, many vendors
        </h2>
        <p>
          A US stablecoin payment company rarely clears through a single rail.
          You need an on-ramp partner, an off-ramp partner, sometimes a payout
          partner in-market. Each one carries independent compliance liability.
          Each one chooses a KYB vendor that fits its risk policy and
          engineering preferences. That choice is rational for the partner. It
          is expensive for you.
        </p>
        <p>
          Your client submits an Aadhaar card, a formation document, and
          ownership evidence once for your own process. Partner A&apos;s vendor
          accepts a particular package shape. Partner B&apos;s vendor wants
          different field names, a different image crop, or an extra
          attestation. Partner C rejects the file that Partner A already
          cleared. Your ops team opens a spreadsheet and starts translating by
          hand.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          Why &quot;just use one vendor&quot; fails
        </h2>
        <p>
          Founders often ask whether they can standardize on a single KYB
          vendor across the stack. You do not control the partner&apos;s vendor
          choice. The partner&apos;s bank and counsel do. Even when two partners
          use vendors in the same category, registry-based tools, upload
          portals, and API verification services, the output schemas still
          diverge. Category similarity is not format compatibility.
        </p>
        <p>
          That is the core of the{" "}
          <InlineLink href="/the-gap">KYB gap</InlineLink>.
          Tools that work well inside one vendor&apos;s wall stop at that wall.
          They do not translate into the next partner&apos;s required package.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          What breaks operationally
        </h2>
        <p>
          Three failure modes show up in every multi-partner stack. Latency:
          each resubmit adds days while a deal waits. Error rate: humans
          re-keying fields introduce mismatches that trigger another reject.
          Coverage: foreign structures and IDs that one vendor handles poorly
          get escalated, while another vendor never sees a normalized version of
          the same evidence.
        </p>
        <p>
          Adding a corridor multiplies the problem. India, Mexico, and the
          Philippines each bring national ID types and regulators that US-centric
          tooling was not designed around. See{" "}
          <InlineLink href="/corridors">example corridors</InlineLink> for how
          Aadhaar, CURP, and PhilSys show up in practice.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          What &quot;fixed&quot; looks like
        </h2>
        <p>
          Fixed does not mean one global KYB monopoly. Fixed means the payment
          company owns a single source package and a translation layer that
          emits partner-specific outputs. Receive what you already have.
          Translate across vendor formats. Route to every infrastructure partner.
          That is the{" "}
          <InlineLink href="/how-it-works">orchestration loop</InlineLink>.
          Until that loop exists, KYB will keep breaking at the border, one
          partner at a time.
        </p>
        <p>Syntex sits at exactly that break point.</p>
      </BlogArticle>
    </main>
  );
}
