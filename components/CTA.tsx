"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RequestAccessButton from "@/components/RequestAccessButton";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      id="access"
      className="section-pad relative overflow-hidden border-t border-white/[0.06] bg-ink py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,255,255,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative mx-auto max-w-2xl text-center" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl text-paper md:text-5xl"
        >
          Book a demo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-5 max-w-md text-base text-mist"
        >
          Tell us which corridors you run and which infrastructure partners you
          clear through.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <RequestAccessButton variant="solid">Book a demo</RequestAccessButton>
        </motion.div>
      </div>
    </section>
  );
}
