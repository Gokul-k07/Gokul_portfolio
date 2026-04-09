'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useThemeContext } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggle } = useThemeContext();

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all duration-300 hover:border-[var(--accent-cyan)]/40 hover:bg-white/10 hover:text-[var(--accent-cyan)]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      suppressHydrationWarning
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Sun size={18} fill="currentColor" />
        ) : (
          <Moon size={18} fill="currentColor" />
        )}
      </motion.div>
    </button>
  );
}
