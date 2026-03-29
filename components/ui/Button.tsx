import Link from "next/link";
import type { ComponentProps } from "react";

type Base = {
  children: React.ReactNode;
  className?: string;
};

type ButtonAsLink = Base & {
  href: string;
  variant?: "primary" | "outline";
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-500/90 to-violet-500/90 text-[var(--bg-void)] btn-glow hover:brightness-110 active:scale-[0.98]",
  outline:
    "border border-white/20 bg-transparent text-foreground hover:border-[var(--accent-cyan)]/60 hover:bg-white/5 active:scale-[0.98]",
};

export function Button({ href, variant = "primary", className = "", children, ...props }: ButtonAsLink) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
