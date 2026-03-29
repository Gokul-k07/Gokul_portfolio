"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { getHeroContainer, getStaggerItem } from "@/lib/sectionVariants";

const focusAreas = ["React + Next.js", "AI product workflows", "Supabase + Firebase", "Kotlin + Android"];

export function Hero() {
  const reduced = useReducedMotion();

  const container = getHeroContainer(reduced);
  const item = getStaggerItem(reduced);

  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-gradient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-60" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          className="order-2 flex w-full flex-1 flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
          variants={container}
          initial={false}
          animate="visible"
        >
          <motion.p
            variants={item}
            className="font-display mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-cyan)] md:text-sm"
          >
            {profile.name} | {profile.location}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl"
          >
            Full-stack engineer for teams shipping product-grade software
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base text-muted md:text-lg lg:mx-0"
          >
            I build production-ready web apps, backend systems, and AI-enabled experiences that are fast,
            clear, and easy to trust in the hands of real users.
          </motion.p>
          <motion.ul variants={item} className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90 sm:text-sm"
              >
                {area}
              </li>
            ))}
          </motion.ul>
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button href="#work" variant="primary">
              View Projects
            </Button>
            <Button href="#contact" variant="outline">
              Let&apos;s Talk
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial={false}
          animate="visible"
          transition={{ delay: reduced ? 0 : 0.35 }}
          className="relative order-1 w-full max-w-[280px] shrink-0 sm:max-w-[300px] lg:order-2 lg:max-w-[340px]"
        >
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/15 bg-[var(--bg-elevated)] shadow-[0_24px_80px_-20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/25"
            whileHover={reduced ? undefined : { scale: 1.02, rotate: 0.5 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <Image
              src={profile.avatarSrc}
              alt={profile.avatarAlt}
              fill
              priority
              sizes="(max-width: 1024px) 280px, 340px"
              className="object-cover object-[center_18%]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-void)]/40 via-transparent to-transparent"
              aria-hidden
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
