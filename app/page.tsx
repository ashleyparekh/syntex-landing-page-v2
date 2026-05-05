import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ProductPreview from "@/components/ProductPreview";
import HowItWorks from "@/components/HowItWorks";
import WhySyntex from "@/components/WhySyntex";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <ProductPreview />
      <HowItWorks />
      <WhySyntex />
      <Contact />
      <CTA />
    </main>
  );
}
