"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { getScrollSectionVariants } from "@/lib/sectionVariants";
import { IconGithub, IconLinkedIn, IconMail } from "@/components/icons/SocialIcons";

const linkClass =
  "inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-[var(--accent-cyan)]";

export function SiteFooter() {
  const reduced = useReducedMotion();
  const variants = getScrollSectionVariants(reduced);

  return (
    <footer id="contact" className="relative border-t border-white/10 px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          variants={variants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Let&apos;s build something worth shipping
          </h2>
          <p className="mt-3 text-muted">
            Open to full-time roles and contract work. Tell me about your stack, timeline, and goals
            &mdash; I&apos;ll respond with clarity on fit and next steps.
          </p>
          <a
            href={profile.email}
            className="btn-glow mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/90 to-violet-500/90 px-8 py-3 text-sm font-semibold text-[var(--bg-void)] transition hover:brightness-110"
          >
            <IconMail className="h-4 w-4" />
            Email {profile.name}
          </a>
          <p className="mt-3 text-sm text-muted">{profile.location}</p>
          <p className="font-display mt-14 text-lg font-semibold text-foreground">{profile.name}</p>
          <p className="mt-2 text-sm text-muted">{profile.role}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a href={profile.email} className={linkClass}>
              <IconMail className="h-5 w-5 shrink-0" />
              Email
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <IconLinkedIn className="h-5 w-5 shrink-0" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <IconGithub className="h-5 w-5 shrink-0" />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
