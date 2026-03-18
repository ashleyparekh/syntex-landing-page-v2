import type { Metadata } from "next";
import NewsletterClient from "./NewsletterClient";

export const metadata: Metadata = {
  title: "Newsletter — Syntex",
  description:
    "Banking intelligence for community bankers. Cyber risk, fintech strategy, market competition, and regulatory signals — delivered weekly.",
};

export default function NewsletterPage() {
  return <NewsletterClient />;
}
