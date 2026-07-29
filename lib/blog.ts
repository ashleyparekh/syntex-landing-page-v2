import { SITE_URL } from "@/lib/site";

export const posts = [
  {
    slug: "genius-act-stablecoin-payment-companies",
    title: "What the GENIUS Act means for stablecoin payment companies",
    description:
      "What the GENIUS Act is, who it affects, and what it means for KYB obligations at US stablecoin payment companies.",
    date: "2026-07-18",
    displayDate: "July 18, 2026",
    category: "Regulation",
  },
  {
    slug: "why-kyb-breaks-at-the-border",
    title: "Why KYB breaks at the border",
    description:
      "How vendor fragmentation forces stablecoin payment companies to rebuild compliance flows for every infrastructure partner.",
    date: "2026-07-02",
    displayDate: "July 2, 2026",
    category: "KYB",
  },
  {
    slug: "aadhaar-curp-philsys-foreign-ids",
    title: "Aadhaar, CURP, PhilSys: why US compliance tools can't read foreign IDs",
    description:
      "Why US-built KYB vendors fail on non-US document types and what that means for emerging-market payment corridors.",
    date: "2026-06-16",
    displayDate: "June 16, 2026",
    category: "Corridors",
  },
  {
    slug: "hidden-cost-second-infrastructure-partner",
    title: "The hidden compliance cost of adding a second infrastructure partner",
    description:
      "Every new payment partner is a new compliance stack. How time and ops cost compound when KYB vendors do not share formats.",
    date: "2026-05-28",
    displayDate: "May 28, 2026",
    category: "Operations",
  },
  {
    slug: "how-stablecoin-rails-work",
    title: "How stablecoin rails actually work: on-ramp, off-ramp, and where compliance fits",
    description:
      "A plain explainer of how a cross-border stablecoin payment moves, written for fintech founders new to stablecoin rails.",
    date: "2026-05-12",
    displayDate: "May 12, 2026",
    category: "Explainer",
  },
] as const;

export type PostMeta = (typeof posts)[number];

export function postUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}

export function getRelated(slug: string) {
  const others = posts.filter((p) => p.slug !== slug).slice(0, 2);
  const pageCycle = [
    { href: "/the-gap", label: "The Gap" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/corridors", label: "Corridors" },
  ];
  const idx = posts.findIndex((p) => p.slug === slug);
  const page = pageCycle[(idx < 0 ? 0 : idx) % pageCycle.length];
  return { posts: others, page };
}
