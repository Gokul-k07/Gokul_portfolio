"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { getScrollSectionVariants, getStaggerContainer, getStaggerItem } from "@/lib/sectionVariants";
import { ProcessSection } from "@/components/sections/ProcessSection";
import GokulGPT from "@/components/GokulGPT";

const TERMINAL_LINES = [
  "> ingest docs -> chunk -> embed -> retrieve",
  "> model config -> temp 0.2 -> structured outputs",
  "> deploy -> edge function -> latency p95 180ms",
  "> guardrails -> pii redact -> rate limit -> audit log",
  "> OpenAI API -> Python -> RAG pipelines",
  "> Chatbots, copilots, and workflow automation",
];

const ASSISTANT_LINES = [
  "How can I help you ship AI features this week?",
  "I can summarize routes, buses online, or API health.",
  'Try: "Draft a rollout checklist for prod."',
  "I keep answers short, cited, and safe by default.",
  "From prompt to production - measured and maintainable.",
];

export function AISection() {
  const reduced = useReducedMotion();
  const sectionVariants = getScrollSectionVariants(reduced);
  const stagger = getStaggerContainer(reduced, 0.08);
  const item = getStaggerItem(reduced);
  const [demoOpen, setDemoOpen] = useState(false);

  const typedPrimary = useTypingEffect(TERMINAL_LINES, {
    disabled: !!reduced,
    loop: true,
    typingSpeed: 36,
    pauseAfterType: 1600,
  });

  const typedAssistant = useTypingEffect(ASSISTANT_LINES, {
    disabled: !!reduced,
    loop: true,
    typingSpeed: 34,
    pauseAfterType: 2400,
    pauseBeforeNext: 600,
  });

  return (
    <section id="ai" aria-labelledby="ai-heading" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={sectionVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-400/20 p-px ai-panel-glow"
        >
          <div className="ai-panel-frame relative overflow-hidden rounded-[calc(1.5rem-1px)] p-8 md:p-12">
            {!reduced ? <div className="ai-scanlines" aria-hidden /> : null}
            <span className="ai-corner ai-corner-tl" aria-hidden />
            <span className="ai-corner ai-corner-br" aria-hidden />

            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent-violet)]/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[var(--accent-cyan)]/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.12),transparent_55%)]"
              aria-hidden
            />

            <motion.div
              variants={stagger}
              initial={false}
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="relative z-10"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <motion.p
                    variants={item}
                    className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-magenta)]"
                  >
                    AI assistant
                  </motion.p>
                  <motion.h2
                    id="ai-heading"
                    variants={item}
                    className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
                  >
                    AI systems that fit the product, not just the demo
                  </motion.h2>
                </div>
                <motion.button
                  variants={item}
                  type="button"
                  onClick={() => setDemoOpen((value) => !value)}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-[var(--accent-cyan)]/50 bg-[var(--accent-cyan)]/15 px-5 py-2.5 text-sm font-semibold text-[var(--accent-cyan)] shadow-[0_0_24px_rgba(34,211,238,0.25)] transition hover:bg-[var(--accent-cyan)]/25"
                >
                  Preview Workflow
                </motion.button>
              </div>

              <motion.p variants={item} className="mt-4 max-w-2xl text-muted md:text-lg">
                LLM features, document pipelines, and workflow automation that feel native&mdash;not bolted on.
                Clear boundaries, observability, and UX that earns trust.
              </motion.p>

              <motion.div
                variants={item}
                className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-black/50 p-4 font-mono text-sm text-[var(--accent-cyan)] shadow-inner backdrop-blur-sm md:p-5 md:text-base"
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-[var(--foreground-muted)]">$ </span>
                  <span className="min-h-[1.25em]">
                    {reduced ? TERMINAL_LINES[0] : typedPrimary}
                    <span className="typing-cursor ml-0.5 inline-block h-[1.1em] w-2 translate-y-px bg-[var(--accent-cyan)] align-middle" />
                  </span>
                </div>
                <div className="border-t border-white/10 pt-4 text-[0.85em] leading-relaxed text-[var(--accent-violet)]/95 md:text-[0.9em]">
                  <span className="text-[var(--foreground-muted)]">assistant | </span>
                  <span>
                    {reduced ? ASSISTANT_LINES[0] : typedAssistant}
                    <span className="typing-cursor ml-0.5 inline-block h-[1em] w-1.5 translate-y-px bg-[var(--accent-violet)] align-middle" />
                  </span>
                </div>
              </motion.div>

              {demoOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <ProcessSection />
                  <button
                    type="button"
                    className="mt-6 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground transition hover:border-[var(--accent-cyan)]/40"
                    onClick={() => setDemoOpen(false)}
                  >
                    Close
                  </button>
                </motion.div>
              ) : null}

              {!reduced && (
                <motion.div
                  className="pointer-events-none absolute bottom-6 right-8 h-2 w-2 rounded-full bg-[var(--accent-violet)]"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* GokulGPT Chatbot */}
      <GokulGPT />
    </section>
  );
}
