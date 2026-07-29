"use client";

import { useState } from "react";
import Link from "next/link";
import { RequestAccessNavLink } from "@/components/RequestAccessButton";

const links = [
  { href: "/the-gap", label: "The Gap" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/who-its-for", label: "Who it's For" },
  { href: "/corridors", label: "Corridors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-ink/80 backdrop-blur-md">
      <nav className="section-pad mx-auto flex h-14 max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 font-display text-sm tracking-wide text-paper"
        >
          SYNTEX
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-mist transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
          <RequestAccessNavLink className="shrink-0 border border-paper/30 px-3.5 py-1.5 text-sm text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink" />
        </div>

        <button
          type="button"
          className="text-sm text-mist md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-ink px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-mist"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <RequestAccessNavLink
              className="text-sm text-paper"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
}
