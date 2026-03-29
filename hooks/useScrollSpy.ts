"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "intro", "work", "ai", "contact"] as const;

/**
 * Tracks which section id is most "active" in the viewport (home page only).
 */
export function useScrollSpy(enabled: boolean) {
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const elements: { id: (typeof SECTION_IDS)[number]; el: HTMLElement }[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) elements.push({ id, el });
    }

    if (elements.length === 0) return;

    const pickActive = () => {
      const line = window.innerHeight * 0.28;
      let bestId: string = SECTION_IDS[0];
      let bestScore = -Infinity;

      for (const { id, el } of elements) {
        const r = el.getBoundingClientRect();
        const visibleTop = Math.max(0, r.top);
        const visibleBottom = Math.min(window.innerHeight, r.bottom);
        const visible = Math.max(0, visibleBottom - visibleTop);
        const height = Math.max(1, r.height);
        const ratio = visible / height;
        const dist = Math.abs(r.top + r.height / 2 - line);
        const score = ratio * 2 - dist / window.innerHeight;
        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }
      setActiveId(bestId);
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive, { passive: true });

    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, [enabled]);

  return activeId;
}
