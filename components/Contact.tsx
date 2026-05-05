"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const contacts = [
  { name: "Ashley Parekh", email: "ashley@syntex.pro", role: "Co-founder" },
  { name: "Ishaan Arora", email: "ishaan@syntex.pro", role: "Co-founder" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-14 md:py-20 bg-white border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Finovate photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-black/[0.07] mb-10 relative"
        >
          <Image
            src="/finovate-london.png"
            alt="Syntex demoing at Finovate London"
            width={1400}
            height={600}
            className="w-full object-cover max-h-[420px]"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
            <div className="text-white font-semibold font-sans text-sm">Finovate Europe, London</div>
            <div className="text-white/60 font-sans text-xs mt-0.5">2x Finovate Scholarship Winner</div>
          </div>
        </motion.div>

        {/* Contact row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-midnight font-display leading-[1.08] mb-3">
              Get in touch.
            </h2>
            <p className="text-base text-midnight/50 font-sans mb-6">
              Questions about a deal, a demo, or how we work — reach us directly.
            </p>
            <motion.a
              href="https://www.linkedin.com/company/syntex-pro/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-black/[0.09] bg-black/[0.02] hover:border-accent-blue/30 hover:bg-accent-blue/[0.04] transition-all duration-300"
            >
              <svg className="w-4 h-4 text-midnight/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium text-midnight/60 font-sans">Syntex on LinkedIn</span>
            </motion.a>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4">
            {contacts.map((c, i) => (
              <motion.a
                key={i}
                href={`mailto:${c.email}`}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex-1 rounded-xl border border-black/[0.08] p-5 bg-black/[0.015] hover:border-accent-blue/30 hover:bg-accent-blue/[0.03] transition-all duration-300 group"
              >
                <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-midnight/35 font-sans mb-2">
                  {c.role}
                </div>
                <div className="text-sm font-semibold text-midnight font-sans mb-1">{c.name}</div>
                <div className="text-sm text-accent-blue font-sans group-hover:underline">{c.email}</div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
