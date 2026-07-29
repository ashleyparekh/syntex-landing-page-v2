import type { Metadata } from "next";
import BlogArticle, { InlineLink } from "@/components/BlogArticle";
import { SITE_URL } from "@/lib/site";

const title =
  "How stablecoin rails actually work: on-ramp, off-ramp, and where compliance fits";
const description =
  "A plain explainer of how a cross-border stablecoin payment moves, written for fintech founders new to stablecoin rails.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog/how-stablecoin-rails-work`,
    languages: { "en-US": `${SITE_URL}/blog/how-stablecoin-rails-work` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/blog/how-stablecoin-rails-work`,
    type: "article",
    locale: "en_US",
  },
};

export default function Page() {
  return (
    <main>
      <BlogArticle slug="how-stablecoin-rails-work" title={title} date="May 12, 2026" category="Explainer">
        <p>
          If you already understand card acquiring or ACH payouts, stablecoin
          rails are less mysterious than the marketing suggests. Value still
          moves from a payer to a payee. The difference is the intermediate
          unit and the partner stack that mints, moves, and redeems it. This
          explainer sticks to the payment path and where KYB sits on that path.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          On-ramp: fiat in, stablecoin out
        </h2>
        <p>
          An on-ramp takes fiat from a business account and issues or transfers
          stablecoins into a wallet or custodial account your platform controls
          or connects to. Under the hood you are dealing with a partner that
          touches banking rails, an issuer or liquidity source, and a compliance
          gate that decides whether that business is allowed to convert. KYB for
          the on-ramp partner is usually the first hard gate for a new client.
        </p>
        <p>
          That gate is not optional. The on-ramp partner inherits AML and
          sanctions obligations. Their KYB vendor defines the document package.
          If your client is a US company paying suppliers in India, the on-ramp
          still needs a clean US-side verification story before coins move.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          The movement: transfer on chain or via custodial ledgers
        </h2>
        <p>
          Once funded, the payment can move as a blockchain transfer or as a
          book transfer inside a custodian, depending on your architecture.
          Speed and cost differ. Compliance responsibilities do not disappear in
          transit. Travel-rule style expectations, wallet attribution, and
          partner contractual controls still apply. For a B2B payout product,
          you care less about retail wallet UX and more about whether the
          receiving partner will accept the funds and convert them.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          Off-ramp: stablecoin in, local fiat out
        </h2>
        <p>
          The off-ramp converts stablecoins into local currency and pushes to a
          bank account or local payment method. This is where corridor reality
          shows up. The off-ramp partner in-market runs its own KYB stack. They
          may need Aadhaar-linked evidence in India, CURP and RFC packages in
          Mexico, or PhilSys-backed identity in the Philippines. Those
          requirements are why{" "}
          <InlineLink href="/corridors">corridor design</InlineLink> is a
          compliance problem as much as a liquidity problem.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          Where compliance fits in the middle
        </h2>
        <p>
          Your company sits between on-ramp and off-ramp partners. Each partner
          clears the same underlying business through a different KYB vendor.
          If those vendors do not share formats, you rebuild the package for
          each hop. That is the{" "}
          <InlineLink href="/the-gap">KYB gap</InlineLink>: the
          payment rail works, the compliance handoff does not.
        </p>
        <p>
          Orchestration means you collect or reuse one evidence set, translate
          it into each vendor&apos;s required shape, and route it so on-ramp and
          off-ramp can both clear without a second scavenger hunt for documents.
          The coins move when the partners say yes. Getting to yes, repeatedly,
          across partners, is where most stacks still break.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          A simple mental model
        </h2>
        <p>
          Fiat → stablecoin → stablecoin transfer → local fiat. Compliance at
          on-ramp. Compliance at off-ramp. Sometimes compliance again for an
          additional payout partner. If you remember only one thing: every arrow
          in that diagram that crosses an institutional boundary can introduce a
          new KYB vendor. Design for that before you promise same-day corridor
          coverage.
        </p>
        <p>
          Compliance is where most of that friction lives — and it&apos;s the
          last piece that hasn&apos;t been automated.
        </p>
      </BlogArticle>
    </main>
  );
}
