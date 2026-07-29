import { CALENDLY_URL } from "@/lib/site";

type Props = {
  className?: string;
  children?: React.ReactNode;
  variant?: "outline" | "solid";
};

export default function RequestAccessButton({
  className = "",
  children = "Book a demo",
  variant = "outline",
}: Props) {
  const base =
    variant === "solid"
      ? "inline-flex items-center border border-paper bg-paper px-8 py-3.5 font-display text-sm text-ink transition-opacity hover:opacity-90"
      : "inline-flex items-center border border-paper/30 px-5 py-2.5 font-display text-sm text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink";

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`}
    >
      {children}
    </a>
  );
}

export function RequestAccessNavLink({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      Book a demo
    </a>
  );
}
