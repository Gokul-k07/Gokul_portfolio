"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaReact, FaFire } from "react-icons/fa"; // Font Awesome
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiSupabase, SiFramer, SiNodedotjs } from "react-icons/si"; // Simple Icons
import { getScrollSectionVariants } from "@/lib/sectionVariants";
import { useReducedMotion } from "framer-motion";

const techStack: Array<{ name: string; logo: IconType }> = [
  { name: "React", logo: FaReact },
  { name: "Next.js", logo: SiNextdotjs },
  { name: "TypeScript", logo: SiTypescript },
  { name: "Tailwind CSS", logo: SiTailwindcss },
  { name: "Firebase", logo: FaFire },
  { name: "Supabase", logo: SiSupabase },
  { name: "Framer Motion", logo: SiFramer },
  { name: "Node.js", logo: SiNodedotjs },
];

export function TechStack() {
  const reduced = useReducedMotion();
  const sectionVariants = getScrollSectionVariants(reduced);
  
  // Create double array for infinite loop effect
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <div className="relative w-full overflow-hidden py-8 my-8">
      <motion.div 
        className="flex items-center justify-start gap-4 px-6"
        variants={sectionVariants}
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <span className="text-sm font-semibold text-foreground/60 whitespace-nowrap">Tech Arsenal</span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
      </motion.div>

      {/* Tech stack marquee with fade edges and pause-on-hover */}
      <div className="relative mt-6 group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="tech-stack overflow-hidden">
          <motion.div
            className="tech-track flex"
            animate={{ x: "-50%" }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              animationPlayState: 'running',
            }}
          >
            {duplicatedStack.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="inline-flex items-center gap-2 px-5 py-2 mx-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer group/item flex-shrink-0"
                whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <span className="text-base group-hover/item:scale-110 transition-transform">
                  <tech.logo />
                </span>
                <span className="text-xs font-medium text-foreground/80 group-hover/item:text-foreground transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
