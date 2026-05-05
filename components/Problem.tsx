"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    number: "60%",
    label: "of private lenders decline all foreign entities",
    style: "border-red-200 bg-red-50/40",
    numberStyle: "text-red-600",
  },
  {
    number: "3 weeks",
    label: "average turnaround at outside counsel",
    style: "border-red-200 bg-red-50/40",
    numberStyle: "text-red-600",
  },
  {
    number: "4+ layers",
    label: "average shell company depth in flagged deals",
    style: "border-red-200 bg-red-50/40",
    numberStyle: "text-red-600",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" ref={ref} className="py-14 md:py-20 bg-white border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-midnight mb-6 font-display leading-[1.08]"
            >
              Trouble doing due diligence<br />on foreign entities?<br />Now you don&apos;t.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3 text-midnight/60 font-sans text-base leading-relaxed"
            >
              <p>The entity is foreign. Your team cannot trace who owns it.</p>
              <p>Outside counsel takes weeks. So you pass.</p>
              <p className="font-semibold text-midnight">Bad actors build structures designed to make you give up. Most of the time, they win.</p>
            </motion.div>
          </div>

          {/* Right: Stat cards */}
          <div className="space-y-4">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className={`rounded-xl p-6 border ${card.style}`}
              >
                <div className={`text-4xl font-bold font-display mb-1.5 ${card.numberStyle}`}>
                  {card.number}
                </div>
                <div className="text-sm font-medium text-midnight/60 font-sans">
                  {card.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
