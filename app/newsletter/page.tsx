import NewsletterClient from "./NewsletterClient";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Newsletter",
  description:
    "Banking intelligence for community bankers. Cyber risk, fintech strategy, market competition, and regulatory signals — delivered weekly.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Newsletter", path: "/newsletter" }])}
      />
      <NewsletterClient />
    </>
  );
}
