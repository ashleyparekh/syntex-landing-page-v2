"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { RequestAccessNavLink } from "@/components/RequestAccessButton";

const NavGlobe = dynamic(() => import("@/components/NavGlobe"), {
  ssr: false,
  loading: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/favicon-32x32.png"
      alt=""
      width={32}
      height={32}
      className="h-8 w-8 shrink-0"
    />
  ),
});

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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] border-b ${
        open
          ? "border-border bg-ink"
          : "border-transparent bg-ink/80 backdrop-blur-md"
      }`}
    >
      <nav className="section-pad relative z-[81] flex h-14 w-full items-center justify-between gap-4">
        <div className="relative z-[82] flex items-center gap-2.5">
          <NavGlobe />
          <Link
            href="/"
            className="shrink-0 font-display text-sm tracking-wide text-paper"
            onClick={() => setOpen(false)}
          >
            SYNTEX
          </Link>
        </div>

        <div className="relative z-[82] hidden items-center gap-5 md:flex">
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
          className="relative z-[82] text-sm text-mist md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <>
          {/* Full-screen opaque scrim so globe never shows through */}
          <div
            className="fixed inset-0 top-14 z-[79] bg-ink md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[81] border-t border-border bg-ink px-6 py-5 md:hidden">
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
        </>
      )}
    </header>
  );
}
