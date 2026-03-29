"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { getScrollSectionVariants } from "@/lib/sectionVariants";

export function Intro() {
  const reduced = useReducedMotion();
  const variants = getScrollSectionVariants(reduced);

  return (
    <section id="intro" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div variants={variants} initial={false} whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Hi, I&apos;m {profile.name} &mdash; {profile.role}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
            I&apos;m based in <strong className="font-semibold text-foreground">{profile.location}</strong>. I
            build interfaces, APIs, data flows, and AI-assisted workflows end to end. The strongest signal in
            my work is not just visual polish&mdash;it is product judgment: solving coordination, automation,
            and security problems with software people will actually use. I work fast, communicate clearly,
            and care about code that can hold up in production.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
