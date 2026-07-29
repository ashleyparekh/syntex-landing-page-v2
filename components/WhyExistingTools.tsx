"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const columns = [
  "Reads Aadhaar",
  "Reads HUF docs",
  "Multi-infra partners",
  "No re-verification",
  "Format translation",
];

const rows: {
  name: string;
  highlight?: boolean;
  cells: boolean[];
}[] = [
  {
    name: "Registry-based KYB tool",
    cells: [true, false, false, false, false],
  },
  {
    name: "Document upload portal",
    cells: [true, false, false, false, false],
  },
  {
    name: "API verification service",
    cells: [false, false, false, false, false],
  },
  {
    name: "Syntex",
    highlight: true,
    cells: [true, true, true, true, true],
  },
];

function CellMark({ ok }: { ok: boolean }) {
  if (ok) {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--ok)]/15 text-[var(--ok)]"
        aria-label="Yes"
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
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bad)]/10 text-[var(--bad)]"
      aria-label="No"
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
        <path
          d="M3 3l6 6M9 3L3 9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function WhyExistingTools() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="why"
      className="section-pad relative overflow-hidden border-t border-white/[0.06] bg-ink py-14 md:py-20"
      aria-label="Comparison grid of KYB tool categories versus Syntex"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="section-inner relative" ref={ref}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-fog"
        >
          Why existing tools do not work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="mb-12 max-w-lg font-display text-2xl text-paper md:text-3xl"
        >
          Each vendor stops at its own format.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="hidden overflow-hidden rounded-xl border border-white/10 md:block"
          role="table"
          aria-label="Capability comparison across registry-based KYB tools, document upload portals, API verification services, and Syntex"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 bg-neutral-950">
                <th className="px-4 py-3 font-display text-xs font-medium text-fog">
                  Category
                </th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-3 text-center font-display text-[11px] font-medium leading-snug text-fog"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <motion.tr
                  key={row.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + ri * 0.08 }}
                  className={
                    row.highlight
                      ? "border-b border-white/10 bg-white/[0.04] last:border-0"
                      : "border-b border-white/10 bg-black last:border-0"
                  }
                >
                  <td
                    className={
                      row.highlight
                        ? "px-4 py-4 font-display text-sm text-paper"
                        : "px-4 py-4 font-display text-sm text-mist"
                    }
                  >
                    {row.name}
                  </td>
                  {row.cells.map((ok, ci) => (
                    <td key={ci} className="px-3 py-4 text-center">
                      <span className="inline-flex justify-center">
                        <CellMark ok={ok} />
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="space-y-3 md:hidden">
          {rows.map((row, ri) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + ri * 0.08 }}
              className={
                row.highlight
                  ? "rounded-xl border border-white/20 bg-white/[0.04] p-4"
                  : "rounded-xl border border-white/10 bg-neutral-950 p-4"
              }
            >
              <p className="font-display text-sm text-paper">{row.name}</p>
              <ul className="mt-3 space-y-2">
                {columns.map((col, ci) => (
                  <li
                    key={col}
                    className="flex items-center justify-between gap-3 text-xs text-mist"
                  >
                    <span>{col}</span>
                    <CellMark ok={row.cells[ci]} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
