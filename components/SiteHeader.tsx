"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { IconGithub, IconLinkedIn } from "@/components/icons/SocialIcons";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const links = [
  { href: "/#hero", id: "hero", label: "Home" },
  { href: "/#intro", id: "intro", label: "About" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#ai", id: "ai", label: "AI" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]";

export function SiteHeader() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const home = pathname === "/";
  const activeId = useScrollSpy(home);

  return (
    <motion.header
      className="header-glass fixed inset-x-0 top-0 z-50 border-b border-white/10"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <Link
          href="/"
          className="font-display shrink-0 text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-90 md:text-base"
        >
          {profile.name}
        </Link>
        <nav
          className="flex max-w-[min(52vw,14rem)] flex-nowrap items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:max-w-none sm:gap-5 md:gap-7 [&::-webkit-scrollbar]:hidden"
          aria-label="Primary"
        >
          {links.map((l) => {
            const active = home && activeId === l.id;
            return (
              <Link
                key={l.href}
                href={l.href}
                scroll={true}
                className={`nav-link relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:text-sm sm:px-4 sm:py-2 ${active
                    ? "bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30"
                    : "text-muted hover:text-foreground hover:bg-white/5 hover:border border-white/10"
                  } border border-transparent`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label="Gokul K on GitHub"
          >
            <IconGithub className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={iconBtn}
            aria-label="Gokul K on LinkedIn"
          >
            <IconLinkedIn className="h-4 w-4" />
          </a>
          <Link
            href="/#contact"
            scroll={true}
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-[var(--accent-cyan)]/50 sm:px-4 sm:text-sm"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
