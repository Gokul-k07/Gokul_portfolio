"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { FlipCard } from "@/components/FlipCard";
import { profile } from "@/data/profile";

const focusAreas = ["React + Next.js", "AI product workflows", "Supabase + Firebase", "Kotlin + Android"];
const roles = ["Full Stack Developer", "AI Engineer", "Product Builder", "Problem Solver"];

export function Hero() {
  const reduced = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);

  // Cycle through roles every 3 seconds
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setRoleIdx((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-gradient-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-60" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="order-2 flex w-full flex-1 flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <p className="font-display mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-cyan)] md:text-sm animate-load delay-0">
            {profile.name} &mdash; {profile.location}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl animate-load delay-1"
          >
            {profile.name} &mdash;
            <span className="ml-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ opacity: 0, y: 4, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -4, filter: "blur(8px)" }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted md:text-lg lg:mx-0 animate-load delay-2">
            I build production-ready web apps, backend systems, and AI-enabled experiences that are fast,
            clear, and easy to trust in the hands of real users.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start animate-load delay-3">
            {focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90 sm:text-sm"
              >
                {area}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start animate-load delay-4">
            <Button href="#work" variant="primary">
              View Projects
            </Button>
            <Button href="#contact" variant="outline">
              Let&apos;s Talk
            </Button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate="visible"
          transition={{ delay: reduced ? 0 : 0.35 }}
          className="relative order-1 w-full max-w-[280px] shrink-0 sm:max-w-[300px] lg:order-2 lg:max-w-[340px] animate-load delay-3"
        >
          <FlipCard />
        </motion.div>
      </div>
    </section>
  );
}
