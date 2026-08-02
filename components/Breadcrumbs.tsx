import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/components/JsonLd";

type Crumb = { name: string; path?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const forSchema = items.filter(
    (item): item is { name: string; path: string } => Boolean(item.path)
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(forSchema)} />
      <nav aria-label="Breadcrumb" className="section-pad mx-auto max-w-5xl pt-20 pb-2">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-fog">
          <li>
            <Link href="/" className="hover:text-mist">
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {item.path && !isLast ? (
                  <Link href={item.path} className="hover:text-mist">
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-mist">{item.name}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
