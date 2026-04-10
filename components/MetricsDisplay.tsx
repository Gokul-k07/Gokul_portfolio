'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { ProjectMetric } from '@/data/projects';

interface MetricsDisplayProps {
  metrics: ProjectMetric[];
  category?: 'blue' | 'green' | 'purple';
}

// Extract numeric value for counting
function extractNumber(value: string): number {
  const match = value.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

// Count-up component
function CountUpMetric({ value, label, index, category }: { value: string; label: string; index: number; category?: string }) {
  const numValue = extractNumber(value);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2; // 2 seconds
    const steps = 60;
    const increment = numValue / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.round(increment * currentStep), numValue));
      if (currentStep >= steps) clearInterval(interval);
    }, (duration * 1000) / steps);

    return () => clearInterval(interval);
  }, [inView, numValue]);

  // Category-based background colors for hover
  const categoryBgColors: Record<string, string> = {
    blue: 'rgba(59, 130, 246, 0.2)',
    green: 'rgba(34, 197, 94, 0.2)',
    purple: 'rgba(168, 85, 247, 0.2)',
  };

  const bgColor = category && categoryBgColors[category] ? categoryBgColors[category] : '';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="text-center p-3 rounded-lg group transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? bgColor : 'transparent',
      }}
    >
      <p className="text-xl md:text-2xl font-bold text-foreground group-hover:text-[var(--accent-cyan)] transition-colors duration-300">
        {count}{value.includes('+') ? '+' : value.includes('%') ? '%' : value.includes('★') ? '★' : value.includes('s') ? 's' : ''}
      </p>
      <p className="text-xs md:text-sm text-muted mt-2 leading-tight">{label}</p>
    </motion.div>
  );
}

export function MetricsDisplay({ metrics, category }: MetricsDisplayProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {metrics.map((metric, idx) => (
        <CountUpMetric
          key={metric.label}
          value={metric.value}
          label={metric.label}
          index={idx}
          category={category}
        />
      ))}
    </div>
  );
}
