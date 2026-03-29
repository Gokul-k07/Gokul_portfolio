"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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

function ProjectCard({ project, index, imagePriority = false }: { project: Project; index: number; imagePriority?: boolean }) {
  return (
    <article className="glass group overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.72)]">
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

        <div className="flex flex-col p-6 sm:p-7 lg:p-10">
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
    </article>
  );
}

function StackedScroll({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} imagePriority={index === 0} />
      ))}
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
          className="mb-8 text-center md:mb-10 md:text-left"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-violet)]">
            Featured work
          </p>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Proof of product thinking, systems depth, and execution
          </h2>
        </motion.div>

        <StackedScroll projects={projects} />
      </div>
    </section>
  );
}
