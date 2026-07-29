"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { JsonLd, faqJsonLd } from "@/components/JsonLd";

export type FaqItem = { question: string; answer: string };

export default function FAQ({
  items,
  title = "Frequently asked questions",
}: {
  items: FaqItem[];
  title?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      className="section-pad border-t border-white/[0.06] bg-[#080808] py-14 md:py-20"
      aria-labelledby="faq-heading"
    >
      <JsonLd data={faqJsonLd(items)} />
      <div className="mx-auto max-w-3xl" ref={ref}>
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-2xl text-paper md:text-3xl"
        >
          {title}
        </motion.h2>
        <dl className="mt-10 space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.05 }}
            >
              <dt className="font-display text-base text-paper md:text-lg">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-mist md:text-base">
                {item.answer}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export const homeFaqs: FaqItem[] = [
  {
    question: "What is KYB orchestration?",
    answer:
      "KYB orchestration sits above your infrastructure partners and their KYB vendors. It takes the documents you already have, translates them into each vendor's required format, and routes those packages so every partner can clear the same client without a separate collection cycle.",
  },
  {
    question: "How does stablecoin compliance work for cross-border payments?",
    answer:
      "A US stablecoin payment company typically clears a business client through multiple partners for on-ramp, off-ramp, and payout rails. Each partner runs its own KYB vendor. Syntex focuses on the format gap between those vendors so compliance work is not rebuilt for every new rail.",
  },
  {
    question: "What documents are required for cross-border business verification?",
    answer:
      "Requirements vary by corridor and partner. Common inputs include national IDs such as Aadhaar, CURP, or PhilSys, plus formation documents and ownership evidence. The hard part is not always collecting the file. It is producing a package each KYB vendor will accept.",
  },
  {
    question: "Who is Syntex built for?",
    answer:
      "US-based cross-border B2B stablecoin payment companies that clear clients through more than one infrastructure partner. If each partner uses a different KYB vendor and your team still patches formats by hand, that is the workflow Syntex is designed for.",
  },
];

export const problemFaqs: FaqItem[] = [
  {
    question: "Why do KYB vendors reject the same document?",
    answer:
      "Vendors parse different field layouts, image quality rules, and country-specific ID schemas. An Aadhaar package that clears one vendor can fail another because the second vendor expects a different structure, metadata, or supporting attachment set.",
  },
  {
    question: "What is vendor fragmentation in stablecoin KYB?",
    answer:
      "Each infrastructure partner picks its own KYB vendor. Those vendors do not share a common document format. The payment company becomes the integration layer, writing custom translation and resubmit flows for every partner pair.",
  },
  {
    question: "Does Syntex replace my KYB vendor?",
    answer:
      "No. Syntex sits above the partners and vendors you already use. It translates and routes packages into each vendor format so you are not rebuilding compliance flows from scratch every time you add a rail.",
  },
];
