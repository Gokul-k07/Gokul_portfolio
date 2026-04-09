'use client';

import { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

export function MagneticButton({ children, href, onClick, variant = 'primary', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base = variant === 'primary'
    ? 'bg-black text-white hover:bg-neutral-800'
    : 'border border-black/20 text-black hover:bg-black/5';

  const inner = (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-colors select-none ${base} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }

  return <div onClick={onClick}>{inner}</div>;
}
