'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from '@/components/MagneticButton';

const sections = ['hero', 'intro', 'work', 'ai', 'contact'];

export function NavBar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Background blur on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (v) => {
      setScrolled(v > 40);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-black/5 dark:border-white/5' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight text-black dark:text-white transition-opacity hover:opacity-90"
        >
          Gokul K
        </Link>

        {/* Nav links with active indicator */}
        <div className="hidden md:flex items-center gap-1">
          {['Home', 'About', 'Work', 'AI', 'Contact'].map((label, i) => {
            const id = sections[i];
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="relative px-3 py-1.5 text-sm transition-colors rounded-full"
                style={{
                  color: isActive
                    ? 'currentColor'
                    : '#6b7280',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-black/8 dark:bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            );
          })}
        </div>

        {/* Right side: Availability badge + CTA */}
        <div className="flex items-center gap-4">
          {/* Pulsing availability badge */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-600 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400" />
            </span>
            Available for work
          </div>
          <MagneticButton href="#contact" variant="primary">
            Let's talk
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}
