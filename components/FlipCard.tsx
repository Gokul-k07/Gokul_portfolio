"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/profile";

export function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, type: "tween" }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="relative aspect-[4/5] w-full rounded-3xl cursor-pointer"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      {/* Front Side - Portrait */}
      <div
        style={{
          backfaceVisibility: "hidden",
        }}
        className="absolute inset-0 w-full h-full border border-white/15 bg-[var(--bg-elevated)] shadow-[0_24px_80px_-20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/25 overflow-hidden rounded-3xl"
      >
        <Image
          src={profile.avatarSrc}
          alt={profile.avatarAlt}
          fill
          priority
          sizes="(max-width: 1024px) 280px, 340px"
          className="object-cover object-[center_18%]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-void)]/40 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      {/* Back Side - Flip Image */}
      <div
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
        className="absolute inset-0 w-full h-full border border-white/15 bg-[var(--bg-elevated)] shadow-[0_24px_80px_-20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/25 overflow-hidden rounded-3xl"
      >
        <Image
          src="/flip-image.png"
          alt="Gokul - Flip Side"
          fill
          priority
          sizes="(max-width: 1024px) 280px, 340px"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-void)]/40 via-transparent to-transparent"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
