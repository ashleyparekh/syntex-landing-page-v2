"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const withoutSteps = [
  "Collect docs",
  "Submit to Partner A",
  "Rejected / reformat",
  "Resubmit to Partner B",
  "Repeat for Partner C",
  "Ops patches by hand",
];

const withSteps = [
  "Docs in once",
  "Syntex translates",
  "Route to all partners",
  "All cleared",
];

export default function BuiltForWhatsNext({
  compact = false,
}: {
  compact?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      className="section-pad relative overflow-hidden border-t border-white/[0.06] bg-[#060606] py-12 md:py-16"
      aria-label="Before and after comparison of KYB workflow without and with Syntex"
    >
      <div className="mx-auto max-w-5xl" ref={ref}>
        {!compact && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-fog"
            >
              Built for what&apos;s next
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="mb-8 max-w-lg font-display text-2xl text-paper md:text-3xl"
            >
              Same documents. Different outcome.
            </motion.h2>
          </>
        )}

        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080808]">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="flex h-full flex-col border-b border-[var(--bad)]/25 bg-[#0c0808] p-5 md:border-b-0 md:border-r md:border-[var(--bad)]/25 md:p-6"
            role="img"
            aria-label="Today without Syntex: fragmented multi-partner KYB flow with rejects and manual patching"
          >
            <p className="font-display text-sm text-[var(--bad)]">
              Today without Syntex
            </p>
            <ol className="mt-6 flex-1 space-y-3">
              {withoutSteps.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 flex flex-col items-center">
                    <span className="h-2 w-2 rounded-full bg-[var(--bad)]" />
                    {i < withoutSteps.length - 1 && (
                      <span className="mt-1 h-5 w-px bg-[var(--bad)]/40" />
                    )}
                  </span>
                  <span className="font-display text-sm text-mist">{step}</span>
                </motion.li>
              ))}
            </ol>
            <p className="mt-auto pt-6 text-xs text-[var(--bad)]/80">
              Fragmented. Slow. Manual.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="flex h-full flex-col border-[var(--ok)]/30 bg-[#080c0a] p-5 md:p-6"
            role="img"
            aria-label="With Syntex: one input, translate, route to all partners with green clears"
          >
            <p className="font-display text-sm text-[var(--ok)]">With Syntex</p>
            <ol className="mt-6 flex-1 space-y-3">
              {withSteps.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ok)]/15 text-[var(--ok)]">
                    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                      <path
                        d="M2.5 6.5l2.5 2.5 4.5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-display text-sm text-paper">{step}</span>
                </motion.li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Partner A", "Partner B", "Partner C"].map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.85 + i * 0.1 }}
                  className="inline-flex items-center gap-1.5 rounded border border-[var(--ok)]/25 bg-[var(--ok)]/10 px-2.5 py-1 font-display text-xs text-[var(--ok)]"
                >
                  {p}
                  <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                    <path
                      d="M2.5 6.5l2.5 2.5 4.5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              ))}
            </div>
            <p className="mt-auto pt-6 text-xs text-[var(--ok)]/80">
              Single flow. Parallel clear.
            </p>
          </motion.div>
          </div>
        </div>

        {!compact && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="section-caption"
          >
            One input. Every partner cleared.
          </motion.p>
        )}
      </div>
    </section>
  );
}
