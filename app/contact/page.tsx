import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import LinkedInButton from "@/components/LinkedInButton";
import RequestAccessButton from "@/components/RequestAccessButton";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";

const title = "Contact";
const description =
  "Want to learn more or work with Syntex? Email ashley@syntex.pro, find us on LinkedIn, or book a demo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: { "en-US": `${SITE_URL}/contact` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/contact`,
    type: "website",
    locale: "en_US",
  },
};

export default function ContactPage() {
  return (
    <main className="pb-24">
      <Breadcrumbs items={[{ name: "Contact" }]} />
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
