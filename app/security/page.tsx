import Security from "@/components/Security";
import CTA from "@/components/CTA";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security",
  description:
    "Syntex is built on enterprise-grade security infrastructure: AWS, end-to-end encryption, audit logs, and more.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <main className="pt-20">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Security", path: "/security" }])}
      />
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 bg-white" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Secure by{" "}
            <span className="text-gradient-blue">Design</span>
          </h1>
          <p className="mt-4 text-silver-dark text-lg max-w-xl mx-auto leading-relaxed font-sans">
            Enterprise compliance and security baked into every layer of the platform.
          </p>
        </div>
      </div>
      <Security />
      <CTA />
    </main>
  );
}
