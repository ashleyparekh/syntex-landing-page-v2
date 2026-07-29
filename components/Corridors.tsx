"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const corridors = [
  {
    route: "Example: US to India",
    codes: ["US", "IN"],
    idType: "Aadhaar",
    regulator: "RBI",
    action:
      "Translate Aadhaar and entity docs into each infra partner's KYB vendor format for Indian payout corridors.",
  },
  {
    route: "Example: US to Mexico",
    codes: ["US", "MX"],
    idType: "CURP",
    regulator: "CNBV",
    action:
      "Map CURP and RFC packages across vendor formats so Mexican corridor partners clear without resubmits.",
  },
  {
    route: "Example: US to Philippines",
    codes: ["US", "PH"],
    idType: "PhilSys",
    regulator: "BSP",
    action:
      "Route PhilSys-backed KYB into partner-specific formats for Philippine remittance corridors.",
  },
];

export default function Corridors({ showHeading = true }: { showHeading?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="corridors"
      className="section-pad relative border-t border-white/[0.06] bg-[#0a0a0a] py-14 md:py-20"
      aria-label="Example corridors Syntex has mapped in depth"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent" />

      <div className="section-inner relative" ref={ref}>
        {showHeading && (
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-4 max-w-lg font-display text-2xl text-paper md:text-3xl"
          >
            Example corridors
          </motion.h2>
        )}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="mb-10 max-w-2xl text-base text-mist"
        >
          Syntex works across any cross-border corridor. Here are a few we&apos;ve
          mapped in depth.
        </motion.p>

        <div className="grid gap-4 lg:grid-cols-3">
          {corridors.map((c, i) => (
            <motion.article
              key={c.route}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="flex flex-col rounded-xl border border-white/10 bg-gradient-to-b from-[#121212] to-[#0b0b0b] p-5"
              aria-label={`${c.route}. National ID ${c.idType}. Regulator ${c.regulator}.`}
            >
              <div className="flex items-center gap-2">
                {c.codes.map((code, idx) => (
                  <span key={code} className="flex items-center gap-2">
                    {idx > 0 && (
                      <span className="text-xs text-fog" aria-hidden>
                        →
                      </span>
                    )}
                    <span className="inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-md border border-white/15 bg-black/40 px-2 font-display text-xs text-paper">
                      {code}
                    </span>
                  </span>
                ))}
              </div>

              <h3 className="mt-5 font-display text-xl text-paper">{c.route}</h3>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/[0.06] bg-black/30 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-fog">
                    National ID
                  </p>
                  <p className="mt-1 font-display text-sm text-paper">
                    {c.idType}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-black/30 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-fog">
                    Regulator
                  </p>
                  <p className="mt-1 font-display text-sm text-paper">
                    {c.regulator}
                  </p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">
                {c.action}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
