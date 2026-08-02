import Breadcrumbs from "@/components/Breadcrumbs";
import LinkedInButton from "@/components/LinkedInButton";
import RequestAccessButton from "@/components/RequestAccessButton";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const title = "Contact";
const description =
  "Get in touch with Syntex or book a demo to see AI-native KYB orchestration in action.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="pb-24">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="section-pad mx-auto max-w-xl">
        <h1 className="font-display text-3xl text-paper md:text-5xl">
          Contact
        </h1>
        <p className="mt-5 text-base text-mist md:text-lg">
          Want to learn more or work with us? Reach out.
        </p>

        <ul className="mt-10 space-y-5 text-base text-mist">
          <li>
            <span className="block text-xs uppercase tracking-[0.14em] text-fog">
              Email
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 inline-block font-display text-paper hover:text-mist"
            >
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <span className="block text-xs uppercase tracking-[0.14em] text-fog">
              LinkedIn
            </span>
            <div className="mt-2">
              <LinkedInButton />
            </div>
          </li>
        </ul>

        <div className="mt-10">
          <RequestAccessButton variant="solid">Book a demo</RequestAccessButton>
        </div>
      </div>
    </main>
  );
}
