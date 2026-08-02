import Hero from "@/components/Hero";
import HomeOverview from "@/components/HomeOverview";
import { JsonLd } from "@/components/JsonLd";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  pageMetadata,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  type: "website",
});

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <main>
        <Hero />
        <HomeOverview />
      </main>
    </>
  );
}
