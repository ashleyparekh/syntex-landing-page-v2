import BlogArticle, { InlineLink } from "@/components/BlogArticle";
import { pageMetadata } from "@/lib/seo";

const title =
  "Aadhaar, CURP, PhilSys: why US compliance tools can't read foreign IDs";
const description =
  "Why US-built KYB vendors fail on non-US document types and what that means for emerging-market payment corridors.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/blog/aadhaar-curp-philsys-foreign-ids",
  type: "article",
});

export default function Page() {
  return (
    <main>
      <BlogArticle slug="aadhaar-curp-philsys-foreign-ids" title={title} date="June 16, 2026" category="Corridors">
        <p>
          US KYB tooling is optimized for US documents: passports, driver
          licenses, EINs, SOS filings. That works until your corridor leaves the
          US. Stablecoin payment companies moving value to India, Mexico, or the
          Philippines run into national ID systems that US vendors only
          partially understand. The file is real. The vendor still rejects it.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          What these IDs actually are
        </h2>
        <p>
          Aadhaar is India&apos;s biometric national ID, issued under UIDAI,
          widely used as identity evidence in financial onboarding. RBI sets the
          rules for how regulated entities treat customer due diligence. CURP is
          Mexico&apos;s unique population registry code. RFC is the tax ID. CNBV
          sits in the supervisory picture for financial entities. PhilSys is the
          Philippines&apos; national ID program. BSP supervises payment and
          banking participants that rely on that identity layer.
        </p>
        <p>
          Those are not exotic edge cases for a cross-border stablecoin company.
          They are the default identity anchors on the corridors that matter for
          payroll, supplier payouts, and B2B remittances. We list them as{" "}
          <InlineLink href="/corridors">example corridors</InlineLink> because
          that is where format friction shows up first.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          Why US tools fail the read
        </h2>
        <p>
          Failures are usually not &quot;the document is fake.&quot; Failures
          are schema and coverage. A registry-based KYB tool that shines on US
          SOS data may only shallow-parse Aadhaar fields. A document upload
          portal may accept a PDF and still fail downstream OCR rules written
          for US licenses. An API verification service may return a pass for a
          passport and a soft fail for PhilSys because the template library is
          thin.
        </p>
        <p>
          Even when Vendor A reads Aadhaar correctly, Vendor B may require a
          different crop, a demographic XML sidecar, or a linked entity
          document that Vendor A never asked for. The payment company is left
          explaining to a client why the same card needs to be photographed
          three times.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          What that means for corridor strategy
        </h2>
        <p>
          Corridor expansion is a compliance product decision, not only a
          liquidity decision. When you add India, you inherit Aadhaar-centric
          evidence patterns and RBI-shaped expectations from partners. Mexico
          brings CURP and RFC packages. The Philippines brings PhilSys. If your
          stack assumes every KYB vendor speaks US document dialects, each new
          corridor becomes a custom engineering project.
        </p>
        <p>
          The durable approach is to treat foreign IDs as first-class inputs and
          to own translation across vendor formats. That is the{" "}
          <InlineLink href="/the-gap">KYB gap</InlineLink> in
          concrete form: the document is fine, the handoff is broken.
        </p>

        <h2 className="!mt-10 font-display text-xl text-paper">
          Practical takeaway
        </h2>
        <p>
          Before you promise a corridor in sales decks, ask each infrastructure
          partner which KYB vendor they use and whether that vendor has
          production-grade support for the national ID on that corridor. Then
          ask what package shape they require. If the answers diverge, you do
          not have a document problem. You have an orchestration problem.
        </p>
        <p>
          Syntex reads those documents natively so your compliance stack
          doesn&apos;t have to pretend they don&apos;t exist.
        </p>
      </BlogArticle>
    </main>
  );
}
