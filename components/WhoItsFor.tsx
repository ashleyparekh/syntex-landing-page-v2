"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const verticals = [
  {
    title: "B2B ecommerce",
    body: "US importers paying overseas suppliers. Each payout partner asks for a different KYB package on the same supplier file.",
  },
  {
    title: "Payroll and contractor payments",
    body: "US companies paying remote international teams. Worker IDs and entity docs get re-verified every time a new rail is added.",
  },
  {
    title: "Remittance platforms",
    body: "Consumer or business money transfers. Corridor partners each run their own KYB vendor, so the same sender clears twice.",
  },
  {
    title: "Trade finance",
    body: "Invoice financing and supply chain payments. Ownership and formation docs stall when vendors disagree on format.",
  },
  {
    title: "Freelance and gig platforms",
    body: "Cross-border payouts to creators and workers. National IDs like Aadhaar, CURP, or PhilSys fail US-centric vendor templates.",
  },
];

export default function WhoItsFor({ showHeading = true }: { showHeading?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="who"
      className="section-pad relative border-t border-white/[0.06] bg-[#080808] py-14 md:py-20"
      aria-label="Industry verticals Syntex is built for"
    >
      <div className="section-inner relative" ref={ref}>
        {showHeading && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-fog"
            >
              Who it is for
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="mb-4 max-w-2xl font-display text-2xl text-paper md:text-3xl"
            >
              Any US cross-border stablecoin payment company
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 }}
              className="mb-10 max-w-2xl text-base text-mist"
            >
              Not limited to one geography. Syntex is for teams that clear
              clients through more than one infrastructure partner, across any
              corridor. India, Mexico, and the Philippines are example markets
              these verticals often run, not a limit on who we serve.
            </motion.p>
          </>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
              className="rounded-xl border border-white/10 bg-[#0c0c0c] p-5"
            >
              <h3 className="font-display text-lg text-paper">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{v.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-sm text-fog"
        >
          Example markets these verticals operate in: India (Aadhaar / RBI),
          Mexico (CURP / CNBV), Philippines (PhilSys / BSP).
        </motion.p>
      </div>
    </section>
  );
}
