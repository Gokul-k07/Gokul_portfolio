import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { getSiteUrl } from "@/lib/site";
import { IconExternal } from "@/components/icons/SocialIcons";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  const base = getSiteUrl();
  const ogImage = `${base}${project.thumbnailSrc}`;
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} - Gokul`,
      description: project.shortDescription,
      url: `/projects/${slug}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Gokul`,
      description: project.shortDescription,
      images: [ogImage],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg-void)] px-6 pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-[var(--accent-cyan)]"
        >
          <span aria-hidden className="inline-block translate-y-px">
            &larr;
          </span>
          Back to Home
        </Link>

        <header className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-violet)]">
            Case study
          </p>
          <p className="mt-4 text-sm font-medium text-foreground/75">{project.projectType}</p>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{project.shortDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/90 to-violet-500/90 px-5 py-2.5 text-sm font-semibold text-[var(--bg-void)] transition hover:brightness-110"
              >
                Live demo
                <IconExternal className="h-4 w-4" />
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-[var(--accent-cyan)]/50"
            >
              {project.sourceLabel ?? "GitHub"}
              <IconExternal className="h-4 w-4" />
            </a>
          </div>
        </header>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          {project.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-foreground/90"
            >
              {highlight}
            </div>
          ))}
        </section>

        <section className="mt-14 space-y-10">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Problem</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Solution</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Result</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.result}</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-xl font-semibold text-foreground">Tech stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/95"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-xl font-semibold text-foreground">Screenshots</h2>
          {project.screenshots.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {project.screenshots.map((shot, index) => (
                <figure
                  key={`${shot.src}-${index}`}
                  className="glass overflow-hidden rounded-2xl border border-white/10"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {shot.alt ? (
                    <figcaption className="px-4 py-3 text-center text-xs text-muted">{shot.alt}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[1, 2].map((placeholder) => (
                <div
                  key={placeholder}
                  className={`glass flex aspect-video flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-gradient-to-br ${project.gradient} p-8 text-center`}
                >
                  <p className="text-sm font-medium text-foreground/90">Preview placeholder</p>
                  <p className="mt-2 text-xs text-muted">Drop images into public and wire them in data/projects.</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="mt-16 border-t border-white/10 pt-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-cyan)] hover:text-[var(--accent-violet)]"
          >
            &larr; Back to all projects
          </Link>
        </div>
      </div>
    </div>
  );
}
