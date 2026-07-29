import Link from "next/link";
import LinkedInButton from "@/components/LinkedInButton";
import { CONTACT_EMAIL, companyLine } from "@/lib/site";

const links = [
  { href: "/the-gap", label: "The Gap" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/who-its-for", label: "Who it's For" },
  { href: "/corridors", label: "Corridors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="section-pad border-t border-border bg-ink py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <Link href="/" className="font-display text-sm tracking-wide text-paper">
            SYNTEX
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            {companyLine}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-mist">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-3 text-sm text-mist">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-paper"
          >
            {CONTACT_EMAIL}
          </a>
          <LinkedInButton />
          <span className="text-fog">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
