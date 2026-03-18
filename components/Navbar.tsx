"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Product", href: "/product" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Blog", href: "/blog" },
    { label: "Security", href: "/security" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-midnight/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Syntex"
            width={36}
            height={36}
            className="invert opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-display text-2xl font-semibold tracking-tight text-white">
            Syntex
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-silver-dark hover:text-white transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://calendly.com/ashleyparekh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-sm font-medium text-midnight bg-white rounded-lg hover:bg-silver-light transition-all duration-300"
          >
            Book a Demo
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-silver-dark hover:text-white transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://calendly.com/ashleyparekh"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 text-sm font-medium text-midnight bg-white rounded-lg text-center"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
