"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  {
    name: "Payment Rail",
    vendor: "KYB Vendor A",
    status: "reject" as const,
  },
  {
    name: "Compliance Vendor",
    vendor: "KYB Vendor B",
    status: "reformat" as const,
  },
  {
    name: "Verification Engine",
    vendor: "KYB Vendor C",
    status: "loading" as const,
  },
];

function DocIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      className={className}
      fill="none"
      aria-hidden
    >
      <rect
        x="4"
        y="2"
        width="32"
        height="44"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="10" y="10" width="14" height="10" rx="1" fill="currentColor" opacity="0.35" />
      <path
        d="M10 28h20M10 34h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="44"
        textAnchor="middle"
        className="fill-current"
        style={{ fontSize: 6, fontFamily: "Space Grotesk, sans-serif" }}
        opacity="0.7"
      >
        Aadhaar
      </text>
    </svg>
  );
}

function StatusMark({ status }: { status: "reject" | "reformat" | "loading" }) {
  if (status === "loading") {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--warn)]/40"
        aria-label="Waiting"
      >
        <span className="animate-spin-slow h-3 w-3 rounded-full border-2 border-[var(--warn)] border-t-transparent" />
      </span>
    );
  }
  if (status === "reformat") {
    return (
      <span className="inline-flex h-6 items-center gap-1 rounded border border-[var(--warn)]/40 px-1.5 font-display text-[10px] uppercase tracking-wider text-[var(--warn)]">
        Reformat
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--bad)]/50 text-[var(--bad)]"
      aria-label="Rejected"
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
        <path
          d="M2 2l8 8M10 2L2 10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Problem({ showHeading = true }: { showHeading?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      id="problem"
      className="section-pad relative overflow-hidden border-t border-white/[0.06] bg-radial-fade py-14 md:py-20"
      aria-label="Diagram showing the same KYB document failing across three infrastructure partners"
    >
      <div className="section-inner relative" ref={ref}>
        {showHeading && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10 font-display text-xs uppercase tracking-[0.2em] text-fog"
          >
            The Gap
          </motion.p>
        )}

        <div
          className="relative mx-auto max-w-4xl"
          role="img"
          aria-label="A stablecoin payment company in the center submitting the same Aadhaar document to three partners. Each partner uses a different KYB vendor. Outcomes show format rejected, requires custom mapping, and waiting on resubmit."
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 mx-auto mb-4 flex w-full max-w-xs flex-col items-center rounded-lg border border-white/15 bg-[#0c0c0c] px-5 py-4 text-center md:mb-10"
          >
            <span className="font-display text-[11px] uppercase tracking-[0.16em] text-fog">
              Stablecoin payment company
            </span>
            <span className="mt-1 font-display text-base text-paper">
              Your stack
            </span>
            <div className="mt-3 flex items-center gap-2 text-mist">
              <DocIcon className="h-8 w-7" />
              <span className="text-xs">Client KYB file</span>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute left-1/2 top-[5.5rem] hidden h-16 w-[min(100%,720px)] -translate-x-1/2 md:block" aria-hidden>
            <svg className="h-full w-full" viewBox="0 0 720 64" fill="none">
              {partners.map((_, i) => {
                const x = 120 + i * 240;
                return (
                  <motion.path
                    key={i}
                    d={`M360 0 C360 28, ${x} 28, ${x} 64`}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1.25"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.25 + i * 0.12 }}
                  />
                );
              })}
            </svg>
          </div>

          <div className="mt-8 grid gap-4 md:mt-6 md:grid-cols-3 md:gap-5">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.15 }}
                className="relative rounded-lg border border-white/10 bg-[#0a0a0a] p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <motion.div
                    animate={
                      inView
                        ? { y: [0, 6, 0], opacity: [0.5, 1, 0.5] }
                        : {}
                    }
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                    className="flex items-center gap-2 text-mist"
                  >
                    <DocIcon className="h-7 w-6 text-mist" />
                    <svg
                      viewBox="0 0 24 12"
                      className="h-3 w-6 text-[var(--bad)]"
                      aria-hidden
                    >
                      <path
                        d="M1 6h14M11 2l5 4-5 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="3 2"
                      />
                    </svg>
                  </motion.div>
                  <StatusMark status={p.status} />
                </div>

                <p className="font-display text-sm text-paper">{p.name}</p>
                <p className="mt-1 text-xs text-fog">Infrastructure partner</p>

                <div className="mt-3 rounded border border-dashed border-white/10 bg-black/40 px-3 py-2">
                  <p className="font-display text-xs text-mist">{p.vendor}</p>
                  <p className="mt-0.5 text-[11px] text-fog">Attached KYB stack</p>
                  <p className="mt-2 text-[11px] leading-snug text-[var(--bad)]/90">
                    {p.status === "reject" && "Format rejected"}
                    {p.status === "reformat" && "Requires custom mapping"}
                    {p.status === "loading" && "Waiting on resubmit"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="section-caption"
        >
          The same client. Three verifications. Zero coordination.
        </motion.p>
      </div>
    </section>
  );
}
