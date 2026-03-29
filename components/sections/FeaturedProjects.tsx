"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { featuredProjects } from "@/data/projects";
import { getScrollSectionVariants } from "@/lib/sectionVariants";
import { IconExternal } from "@/components/icons/SocialIcons";

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        href={`/projects/${project.slug}`}
        className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 px-4 py-3 text-center text-sm font-semibold text-[var(--accent-cyan)] transition-colors hover:bg-[var(--accent-cyan)]/20 sm:flex-initial"
      >
        Case study
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </Link>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/30 sm:flex-initial"
        >
          Live demo
          <IconExternal className="h-3.5 w-3.5" />
        </a>
      ) : null}
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold text-muted transition-colors hover:border-white/25 hover:text-foreground sm:flex-initial"
      >
        {project.sourceLabel ?? "GitHub"}
        <IconExternal className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function ProjectCard({ project, index, imagePriority = false, stackPosition = 0, isTopCard = false }: { project: Project; index: number; imagePriority?: boolean; stackPosition?: number; isTopCard?: boolean }) {
  // Apply moderate blur to stacked projects for better visual separation
  const blurAmount = isTopCard ? 0 : 100; // 30px blur for stacked cards, 0 for top card
  const glassClasses = isTopCard
    ? "glass group overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.72),0_0_20px_rgba(34,211,238,0.15)]"
    : "glass group overflow-hidden rounded-[2rem] border border-white/6 shadow-[0_16px_64px_-24px_rgba(0,0,0,0.48)]";

  const backdropBlur = `blur(${blurAmount}px)`;
  const opacity = isTopCard ? 1 : 0.9;

  return (
    <motion.article
      className={glassClasses}
      style={{
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        opacity,
      }}
    >
      <div className="grid min-h-[22rem] md:min-h-[calc(100dvh-8.5rem)] lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)]">
        <div className="relative min-h-[18rem] overflow-hidden bg-[var(--bg-elevated)] lg:min-h-full">
          <Image
            src={project.thumbnailSrc}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 58vw"
            quality={88}
            priority={imagePriority}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-[var(--bg-void)]/18 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-5 sm:p-6">
            <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/85 backdrop-blur-sm">
              {project.projectType}
            </span>
            <span className="font-display rounded-full border border-white/12 bg-black/30 px-3 py-1 text-sm font-semibold text-foreground/80 backdrop-blur-sm">
              0{index + 1}
            </span>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-7 lg:p-10 bg-[var(--bg-elevated)]/95 backdrop-blur-sm">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{project.shortDescription}</p>

          <ul className="mt-6 space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_12px_rgba(34,211,238,0.55)]"
                  aria-hidden
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground/90"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <ProjectActions project={project} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function StackedScroll({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topCardIndex, setTopCardIndex] = useState(0);

  // Track scroll progress through the stacking section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Update top card index when scroll progress changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const segmentSize = 1 / projects.length;
      setTopCardIndex(Math.min(Math.floor(progress / segmentSize), projects.length - 1));
    });
    return unsubscribe;
  }, [scrollYProgress, projects.length]);

  // Calculate animation transforms for all cards
  const cardTransforms: Array<{ y: any; opacity: any; scale: any }> = [];
  for (let i = 0; i < projects.length; i++) {
    // Each card gets activated at different scroll progress points
    const segmentSize = 1 / projects.length;
    const startProgress = i * segmentSize;
    const endProgress = (i + 1) * segmentSize;
    const progress = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1]);

    // Card starts from bottom of viewport, moves to center, then stays in stack
    const y = useTransform(progress, [0, 0.5, 1], ["100vh", "0vh", `${-i * 60}px`]);
    const opacity = useTransform(progress, [0, 0.2, 1], [0, 1, 1]);
    const scale = useTransform(progress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);

    cardTransforms.push({ y, opacity, scale });
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-1/2 flex items-center justify-center" style={{ transform: 'translateY(-50%)' }}>
        {projects.map((project, index) => {
          const { y, opacity, scale } = cardTransforms[index];
          return (
            <motion.div
              key={project.slug}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                y,
                opacity,
                scale,
                zIndex: index + 1,
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                imagePriority={index === 0}
                stackPosition={index}
                isTopCard={topCardIndex === index}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const reduced = useReducedMotion();
  const sectionVariants = getScrollSectionVariants(reduced);
  const projects = featuredProjects;

  return (
    <section id="work" className="relative px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-16 text-center md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-violet)]">
            Featured work
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Proof of product thinking, systems depth, and execution
          </h2>
        </motion.div>

        <StackedScroll projects={projects} />
        {/* Spacer to separate from AI section */}
        <div className="h-40 md:h-64" />
      </div>
    </section>
  );
}
