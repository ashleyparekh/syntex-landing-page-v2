"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/favicon-32x32.png"
      alt=""
      width={32}
      height={32}
      className="h-8 w-8"
    />
  ),
});

/** Always-on 32px spinning globe beside the SYNTEX wordmark. */
export default function NavGlobe() {
  return (
    <div className="relative h-8 w-8 shrink-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0">
        <Globe docked />
      </div>
    </div>
  );
}
