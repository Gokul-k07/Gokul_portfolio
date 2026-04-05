"use client";

import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useScrollSpy } from "@/hooks/useScrollSpy";

type CursorMode = "default" | "hero" | "intro" | "work" | "ai" | "contact";

function modeFromSection(id: string): CursorMode {
  if (id === "hero") return "hero";
  if (id === "intro") return "intro";
  if (id === "work") return "work";
  if (id === "ai") return "ai";
  if (id === "contact") return "contact";
  return "default";
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export function InteractiveCursor() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const home = pathname === "/";
  const activeId = useScrollSpy(home);
  const mode = modeFromSection(activeId);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!home || reduced || !finePointer) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [home, reduced, finePointer]);

  useEffect(() => {
    if (!home || reduced || !finePointer) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    
    // Hide cursor on interactive elements
    const style = document.createElement('style');
    style.id = 'interactive-cursor-hide';
    style.textContent = `
      button, a, input, select, textarea, label { cursor: none !important; }
      button:hover, a:hover, input:hover, select:hover, textarea:hover { cursor: none !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.cursor = prev;
      style.remove();
    };
  }, [home, reduced, finePointer]);

  if (!home || reduced || !finePointer) return null;

  const style = { left: pos.x, top: pos.y } as const;
  const base = "pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 will-change-transform";

  let inner: React.ReactNode;
  switch (mode) {
    case "hero":
      inner = (
        <div
          className={`${base} h-10 w-10 rounded-full border-2 border-[var(--accent-cyan)]/70 bg-[var(--accent-cyan)]/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]`}
          style={style}
        />
      );
      break;
    case "intro":
      inner = (
        <div
          className={`${base} h-2.5 w-2.5 rounded-full bg-[var(--accent-violet)] shadow-[0_0_12px_rgba(167,139,250,0.8)]`}
          style={style}
        />
      );
      break;
    case "work":
      inner = (
        <div
          className={`${base} flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-[var(--bg-elevated)]/90 text-[var(--accent-cyan)] shadow-lg backdrop-blur-sm`}
          style={style}
        >
          <GearIcon className="h-4 w-4" />
        </div>
      );
      break;
    case "ai":
      inner = (
        <Fragment>
          <div
            className={`${base} h-14 w-14 rounded-full bg-[var(--accent-cyan)]/25 blur-xl`}
            style={style}
          />
          <div
            className={`${base} h-9 w-9 rounded-full border border-[var(--accent-cyan)]/80 bg-[var(--accent-cyan)]/15 shadow-[0_0_32px_rgba(34,211,238,0.65),0_0_64px_rgba(167,139,250,0.35)]`}
            style={style}
          />
        </Fragment>
      );
      break;
    case "contact":
      inner = (
        <div
          className={`${base} h-8 w-8 rotate-45 rounded-md border border-white/35 bg-white/10`}
          style={style}
        />
      );
      break;
    default:
      inner = (
        <div
          className={`${base} flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/5 shadow-[0_0_12px_rgba(255,255,255,0.15)]`}
          style={style}
        />
      );
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      aria-hidden
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.15s ease" }}
    >
      {inner}
    </div>
  );
}
