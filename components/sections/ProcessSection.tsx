'use client';

import { ScrollReveal } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Discover', desc: 'We align on goals, users, constraints, and definition of done before a single line of code.' },
  { num: '02', title: 'Scope', desc: 'I map a lean delivery plan — what ships in v1, what waits. No bloat, no scope creep.' },
  { num: '03', title: 'Build', desc: 'Iterative sprints with daily updates. You see real progress, not promises.' },
  { num: '04', title: 'Ship', desc: 'Production deploy with tests, docs, and handoff. Code you can actually maintain.' },
  { num: '05', title: 'Support', desc: 'Async support post-launch. I don\'t disappear when the invoice is paid.' },
];

export function ProcessSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest block mb-4 dark:text-neutral-500">How I work</span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-16 text-black dark:text-white">
          What it&apos;s like to<br />work with me
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700 hidden md:block" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 items-start pl-0 md:pl-16 relative"
              >
                {/* Step number dot */}
                <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-slate-900 items-center justify-center text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                  {step.num}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1.5 text-black dark:text-white">{step.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
