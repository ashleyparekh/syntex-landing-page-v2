"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const docs = [
  { label: "Aadhaar", delay: 0 },
  { label: "RFC", delay: 0.35 },
  { label: "Corp reg", delay: 0.7 },
];

const outputs = ["Payment Rail", "Compliance Vendor", "Verification Engine"];

function MiniDoc({ label }: { label: string }) {
  return (
    <div className="flex h-14 w-11 flex-col items-center justify-between rounded border border-white/20 bg-[#111] px-1 py-1.5">
      <span className="h-4 w-6 rounded-sm bg-white/20" />
      <span className="text-[8px] leading-none text-mist">{label}</span>
    </div>
  );
}

export default function HowItWorks({
  showHeading = true,
  homeVisual = false,
}: {
  showHeading?: boolean;
  homeVisual?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="how"
      className={`section-pad relative overflow-hidden border-t border-white/[0.06] bg-ink ${
        homeVisual ? "py-12 md:py-14" : "py-14 md:py-20"
      }`}
      aria-label="Animated pipeline showing documents entering Syntex, translating across formats, and routing to partners"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03),_transparent_55%)]" />

      <div className="section-inner relative" ref={ref}>
        {homeVisual && (
          <p className="mb-6 font-display text-xs uppercase tracking-[0.2em] text-fog">
            How it works
          </p>
        )}
        {showHeading && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-fog"
            >
              How Syntex works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="mb-12 max-w-lg font-display text-2xl text-paper md:text-3xl"
            >
              One input. Every partner cleared.
            </motion.h2>
          </>
        )}

        <div
          className="relative overflow-hidden rounded-xl border border-white/10 bg-[#070707] p-5 md:p-8"
          role="img"
          aria-label="Three-step pipeline: documents drop into Syntex, formats are translated inside a pulsing Syntex node, then three green-check outputs fan out to a payment rail, compliance vendor, and verification engine"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <p className="mb-3 font-display text-[11px] uppercase tracking-[0.16em] text-fog">
                01 Receive
              </p>
              <div className="relative flex h-36 items-end justify-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-black/50 px-3 pb-4">
                {docs.map((d) => (
                  <motion.div
                    key={d.label}
                    initial={{ y: -80, opacity: 0 }}
                    animate={
                      inView
                        ? {
                            y: [-80, 0, 0, 8, 0],
                            opacity: [0, 1, 1, 1, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2.8,
                      delay: 0.4 + d.delay,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      times: [0, 0.25, 0.55, 0.7, 1],
                    }}
                  >
                    <MiniDoc label={d.label} />
                  </motion.div>
                ))}
                <div className="pointer-events-none absolute inset-x-3 bottom-2 h-px bg-white/15" />
              </div>
              {!homeVisual && (
                <p className="mt-3 text-xs text-mist">
                  Docs you already have drop into Syntex.
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="hidden justify-center lg:flex"
              aria-hidden
            >
              <svg width="40" height="12" viewBox="0 0 40 12">
                <motion.path
                  d="M0 6h32M28 2l6 4-6 4"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <p className="mb-3 font-display text-[11px] uppercase tracking-[0.16em] text-fog">
                02 Translate
              </p>
              <div className="pulse-node relative flex h-36 flex-col items-center justify-center overflow-hidden rounded-lg border border-white/25 bg-[#0d0d0d]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_60%)]" />
                <span className="relative z-10 font-display text-lg tracking-wide text-paper">
                  SYNTEX
                </span>
                <div className="relative z-10 mt-3 flex items-center gap-2">
                  <motion.div
                    animate={
                      inView
                        ? {
                            rotateY: [0, 90, 180, 270, 360],
                            opacity: [1, 0.4, 1, 0.4, 1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <MiniDoc label="Src" />
                  </motion.div>
                  <motion.span
                    animate={inView ? { opacity: [0.3, 1, 0.3] } : {}}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="font-display text-xs text-mist"
                  >
                    →
                  </motion.span>
                  <div className="flex flex-col gap-1">
                    {["Fmt A", "Fmt B", "Fmt C"].map((f, i) => (
                      <motion.span
                        key={f}
                        initial={{ opacity: 0, x: -6 }}
                        animate={
                          inView
                            ? { opacity: [0, 1, 1, 0], x: [-6, 0, 0, 4] }
                            : {}
                        }
                        transition={{
                          duration: 2.4,
                          delay: 0.6 + i * 0.25,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="rounded border border-white/15 px-1.5 py-0.5 text-[9px] text-mist"
                      >
                        {f}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
              {!homeVisual && (
                <p className="mt-3 text-xs text-mist">
                  Same source, vendor-specific formats.
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              className="hidden justify-center lg:flex"
              aria-hidden
            >
              <svg width="40" height="12" viewBox="0 0 40 12">
                <path
                  d="M0 6h32M28 2l6 4-6 4"
                  stroke="rgba(62,207,142,0.7)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45 }}
            >
              <p className="mb-3 font-display text-[11px] uppercase tracking-[0.16em] text-fog">
                03 Route
              </p>
              <div className="flex h-36 flex-col justify-center gap-2">
                {outputs.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.12 }}
                    className="flex items-center justify-between rounded-lg border border-[var(--ok)]/25 bg-[var(--ok)]/[0.06] px-3 py-2"
                  >
                    <span className="font-display text-sm text-paper">{name}</span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        delay: 1 + i * 0.15,
                        stiffness: 280,
                      }}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ok)]/20 text-[var(--ok)]"
                      aria-label="Cleared"
                    >
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
                  </motion.div>
                ))}
              </div>
              {!homeVisual && (
                <p className="mt-3 text-xs text-mist">
                  All partners cleared in parallel.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
