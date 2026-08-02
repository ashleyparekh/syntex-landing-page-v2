import Solution from "@/components/Solution";
import ProductDeepDive from "@/components/ProductDeepDive";
import CTA from "@/components/CTA";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product",
  description:
    "Explore the Syntex platform: client portal for guided document collection and banker dashboard for full onboarding visibility.",
  path: "/product",
});

export default function ProductPage() {
  return (
    <main className="pt-20">
      <JsonLd data={breadcrumbJsonLd([{ name: "Product", path: "/product" }])} />
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 bg-white" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            The Syntex{" "}
            <span className="text-gradient-blue">Platform</span>
          </h1>
        </div>
      </div>
      <Solution />
      <ProductDeepDive />
      <CTA />
    </main>
  );
}
