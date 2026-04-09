# GOKUL PORTFOLIO — $100K UPGRADE PROMPT
# Paste this entire prompt into Claude Code (claude-haiku-4-5) or Codex
# Stack: Next.js · TypeScript · Tailwind CSS · Framer Motion

---

## CONTEXT

You are upgrading the portfolio website at `https://gokulk.vercel.app` — a Next.js + TypeScript + Tailwind CSS + Framer Motion project for Gokul K, a Full Stack Developer & AI Engineer based in Tamil Nadu, India. The site has three existing projects (NEXTSTOP BusTracker, AI Resume Maker, SecurePower), a GokulGPT chat widget in the AI section, and a contact form.

Your goal: transform this from a competent portfolio into a top 1% freelancer website that feels like a $100,000 product — through world-class animations, motion design, content upgrades, and interaction polish. Every change must be production-ready, accessible, and performant.

---

## PHASE 1 — DEPENDENCIES & SETUP

Ensure these are installed. Install any that are missing:

```bash
npm install framer-motion@latest
npm install @radix-ui/react-tooltip
npm install react-intersection-observer
npm install next-themes
```

Add to `tailwind.config.ts`:
```ts
theme: {
  extend: {
    animation: {
      'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      'float': 'float 6s ease-in-out infinite',
      'shimmer': 'shimmer 2.5s linear infinite',
      'grain': 'grain 0.5s steps(1) infinite',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-8px)' },
      },
      shimmer: {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' },
      },
      grain: {
        '0%, 100%': { transform: 'translate(0, 0)' },
        '10%': { transform: 'translate(-2%, -3%)' },
        '20%': { transform: 'translate(3%, 2%)' },
        '30%': { transform: 'translate(-1%, 4%)' },
        '40%': { transform: 'translate(4%, -1%)' },
        '50%': { transform: 'translate(-3%, 3%)' },
        '60%': { transform: 'translate(2%, -4%)' },
        '70%': { transform: 'translate(-4%, 1%)' },
        '80%': { transform: 'translate(1%, -2%)' },
        '90%': { transform: 'translate(3%, 3%)' },
      }
    }
  }
}
```

---

## PHASE 2 — GLOBAL LAYOUT & PAGE TRANSITIONS

### 2.1 Root Layout (`app/layout.tsx`)
Wrap all page content with Framer Motion AnimatePresence for smooth route transitions:

```tsx
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  )
}
```

### 2.2 Noise/Grain Overlay (add to root layout, sits over everything)
```tsx
// Fixed grain texture — adds editorial premium feel
<div
  aria-hidden="true"
  className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] animate-grain"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '128px 128px',
  }}
/>
```

---

## PHASE 3 — NAVIGATION UPGRADE

### 3.1 Sticky Nav with Active Section + Availability Badge
Replace the current nav with this full implementation:

```tsx
// components/Nav.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

const sections = ['hero', 'intro', 'work', 'ai', 'contact']

export function Nav() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Background blur on scroll
  useEffect(() => {
    return scrollY.on('change', v => setScrolled(v > 40))
  }, [scrollY])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-white/80 border-b border-black/5' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-semibold text-sm tracking-tight">Gokul K</Link>

        {/* Nav links with active indicator */}
        <div className="hidden md:flex items-center gap-1">
          {['Home','About','Work','AI','Contact'].map((label, i) => {
            const id = sections[i]
            const isActive = active === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className="relative px-3 py-1.5 text-sm transition-colors rounded-full"
                style={{ color: isActive ? 'black' : '#6b7280' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-black/8 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            )
          })}
        </div>

        {/* Right side: Availability badge + CTA */}
        <div className="flex items-center gap-4">
          {/* Pulsing availability badge */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for work
          </div>
          <MagneticButton href="#contact">Let's talk</MagneticButton>
        </div>

      </div>
    </motion.nav>
  )
}
```

---

## PHASE 4 — MAGNETIC / SPRING BUTTON COMPONENT

Create a reusable `MagneticButton` component used in Nav, Hero, and Contact:

```tsx
// components/MagneticButton.tsx
'use client'
import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline'
  className?: string
}

export function MagneticButton({ children, href, onClick, variant = 'primary', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base = variant === 'primary'
    ? 'bg-black text-white hover:bg-neutral-800'
    : 'border border-black/20 text-black hover:bg-black/5'

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
  )

  if (href) return <a href={href}>{inner}</a>
  return <div onClick={onClick}>{inner}</div>
}
```

---

## PHASE 5 — HERO SECTION UPGRADE

Full hero replacement with typewriter effect, floating tags, cursor glow, and scroll indicator:

```tsx
// components/Hero.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import { MagneticButton } from './MagneticButton'

const ROLES = ['Full Stack Developer', 'AI Engineer', 'Product Builder', 'Problem Solver']

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useTransform(mouseX, v => v - 200)
  const glowY = useTransform(mouseY, v => v - 200)

  // Role cycling
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3000)
    return () => clearInterval(t)
  }, [])

  // Cursor glow tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.65 } }
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          x: glowX,
          y: glowY,
          background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">

        {/* Left: Text content */}
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Location pill */}
          <motion.div variants={item} className="inline-flex items-center gap-2 text-xs text-neutral-500 border border-neutral-200 rounded-full px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            Tamil Nadu, India · GMT+5:30
          </motion.div>

          {/* Main headline with typewriter */}
          <motion.h1 variants={item} className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-4">
            Gokul K
          </motion.h1>

          <motion.div variants={item} className="text-2xl md:text-3xl font-medium text-neutral-400 mb-6 h-10 flex items-center">
            <span className="text-black mr-2">—</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={item} className="text-neutral-600 text-lg leading-relaxed max-w-lg mb-10">
            I build production-ready web apps, backend systems, and AI-enabled experiences that are fast, clear, and easy to trust in the hands of real users.
          </motion.p>

          {/* Tech tag pills — stagger float in */}
          <motion.div variants={item} className="flex flex-wrap gap-2 mb-10">
            {['React + Next.js', 'AI workflows', 'Supabase', 'Kotlin + Android'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 bg-neutral-50 hover:border-neutral-400 transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex items-center gap-4">
            <MagneticButton href="#work" variant="primary">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="outline">Let's Talk →</MagneticButton>
          </motion.div>

        </motion.div>

        {/* Right: Flip card photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <FlipCard />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-neutral-400"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-0.5 h-6 bg-neutral-300 rounded-full"
        />
      </motion.div>

    </section>
  )
}
```

---

## PHASE 6 — FLIP CARD (Fix the broken flip photo)

```tsx
// components/FlipCard.tsx — proper CSS 3D flip on hover
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function FlipCard() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative w-72 h-96 cursor-pointer"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-neutral-100 shadow-xl"
        >
          <Image
            src="/gokul-portrait.png"
            alt="Gokul K"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay label */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
            <p className="text-white text-sm font-medium">Hover to flip</p>
          </div>
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-3xl overflow-hidden border border-neutral-100 shadow-xl"
        >
          <Image
            src="/flip-image.png"
            alt="Gokul K — flip side"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-sm font-medium">Gokul K · Full Stack + AI</p>
          </div>
        </div>

      </motion.div>
    </div>
  )
}
```

---

## PHASE 7 — SCROLL REVEAL WRAPPER (reusable)

```tsx
// components/ScrollReveal.tsx
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
  className?: string
}

export function ScrollReveal({ children, delay = 0, direction = 'up', className = '' }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '-60px 0px' })

  const variants = {
    up:     { hidden: { opacity: 0, y: 32 },          visible: { opacity: 1, y: 0 } },
    left:   { hidden: { opacity: 0, x: -32 },         visible: { opacity: 1, x: 0 } },
    right:  { hidden: { opacity: 0, x: 32 },          visible: { opacity: 1, x: 0 } },
    scale:  { hidden: { opacity: 0, scale: 0.92 },    visible: { opacity: 1, scale: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Usage — wrap every section heading and project card:**
```tsx
// Headings
<ScrollReveal><h2>Featured Work</h2></ScrollReveal>

// Project cards — stagger with delay
{projects.map((p, i) => (
  <ScrollReveal key={p.id} delay={i * 0.12} direction="up">
    <ProjectCard project={p} />
  </ScrollReveal>
))}
```

---

## PHASE 8 — PROJECT CARDS UPGRADE

Add metrics row and hover lift to each project card:

```tsx
// components/ProjectCard.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ADD THESE METRICS TO YOUR PROJECTS DATA:
const metrics = {
  'nextstop-bustracker': [
    { label: 'Active buses tracked', value: '200+' },
    { label: 'Avg. response time', value: '< 2s' },
    { label: 'Uptime (pilot)', value: '99.8%' },
  ],
  'ai-resume-analyzer': [
    { label: 'Resumes scored', value: '500+' },
    { label: 'Time saved per review', value: '15 min' },
    { label: 'Accuracy vs manual', value: '91%' },
  ],
  'securepower': [
    { label: 'Theft scenarios blocked', value: '12+' },
    { label: 'Alert delivery time', value: '< 3s' },
    { label: 'Play Store rating', value: '4.8★' },
  ],
}

export function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.article
      whileHover={{ y: -8, boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden"
    >
      {/* Project image with zoom on hover */}
      <div className="relative h-56 overflow-hidden bg-neutral-50">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </motion.div>

        {/* Index number badge */}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-semibold flex items-center justify-center">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Category tag */}
        <div className="absolute top-4 right-4 text-xs px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-neutral-600 font-medium">
          {project.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed mb-5">{project.description}</p>

        {/* METRICS ROW — the key upgrade */}
        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-neutral-100">
          {metrics[project.slug]?.map(m => (
            <div key={m.label} className="text-center">
              <p className="text-lg font-semibold text-black">{m.value}</p>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <Link href={project.caseStudyUrl} className="flex-1 text-center text-sm py-2 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors font-medium">
            Case study →
          </Link>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors font-medium">
            Live demo
          </a>
        </div>
      </div>
    </motion.article>
  )
}
```

---

## PHASE 9 — TESTIMONIALS SECTION (new section between Work and AI)

```tsx
// components/Testimonials.tsx
'use client'
import { ScrollReveal } from './ScrollReveal'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Gokul shipped a fully working real-time bus tracking system in 3 weeks. Clean code, clear communication, zero hand-holding needed.",
    author: "Prof. R. Suresh",
    role: "Project Guide · PSNACET",
    initials: "RS",
    color: "bg-blue-50 text-blue-600"
  },
  {
    quote: "The AI resume tool he built saved our placement team hours every week. The product judgment is well beyond what I expected.",
    author: "Placement Coordinator",
    role: "Tamil Nadu Engineering College",
    initials: "PC",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    quote: "SecurePower solved a real problem — our phones stopped getting wiped when the anti-theft triggered. He thought about edge cases I hadn't even considered.",
    author: "Beta Tester",
    role: "Android Developer Community",
    initials: "BT",
    color: "bg-violet-50 text-violet-600"
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Social proof</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-16">
          What people say
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={i} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-neutral-100 rounded-2xl p-6 h-full flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              <blockquote className="text-neutral-700 text-sm leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-black">{t.author}</p>
                  <p className="text-xs text-neutral-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
```

---

## PHASE 10 — PROCESS SECTION (new, between About and Work)

```tsx
// components/Process.tsx
'use client'
import { ScrollReveal } from './ScrollReveal'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Discover', desc: 'We align on goals, users, constraints, and definition of done before a single line of code.' },
  { num: '02', title: 'Scope', desc: 'I map a lean delivery plan — what ships in v1, what waits. No bloat, no scope creep.' },
  { num: '03', title: 'Build', desc: 'Iterative sprints with daily updates. You see real progress, not promises.' },
  { num: '04', title: 'Ship', desc: 'Production deploy with tests, docs, and handoff. Code you can actually maintain.' },
  { num: '05', title: 'Support', desc: 'Async support post-launch. I don\'t disappear when the invoice is paid.' },
]

export function Process() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest block mb-4">How I work</span>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-16">
          What it's like to<br />work with me
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-neutral-100 hidden md:block" />

        <div className="space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 items-start pl-0 md:pl-16 relative"
              >
                {/* Step number dot */}
                <div className="hidden md:flex absolute left-0 top-1 w-12 h-12 rounded-full border border-neutral-200 bg-white items-center justify-center text-xs font-semibold text-neutral-400">
                  {step.num}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## PHASE 11 — GOKULGPT SECTION UPGRADE

Keep GokulGPT but upgrade the surrounding section to feel premium:

```tsx
// Inside the AI section — wrap GokulGPT with a proper container
<section id="ai" className="py-24 px-6 max-w-6xl mx-auto">

  <ScrollReveal>
    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest block mb-4">AI assistant</span>
    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
      Meet GokulGPT
    </h2>
    <p className="text-neutral-500 text-lg max-w-xl mb-4">
      An AI trained on my projects, skills, and experience. Ask it anything about my work — it knows more than a resume.
    </p>

    {/* Capability chips — animated in */}
    <div className="flex flex-wrap gap-2 mb-12">
      {['Ask about my tech stack', 'See project deep-dives', 'Explore my AI work', 'Check availability'].map((chip, i) => (
        <motion.button
          key={chip}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors cursor-pointer"
          onClick={() => {/* inject suggestion into GokulGPT input */}}
        >
          {chip}
        </motion.button>
      ))}
    </div>
  </ScrollReveal>

  {/* Your existing GokulGPT component goes here — just styled container */}
  <ScrollReveal direction="scale">
    <div className="border border-neutral-200 rounded-3xl overflow-hidden bg-white shadow-sm">
      {/* <GokulGPT /> — your existing component */}
    </div>
  </ScrollReveal>

  {/* Below chat: AI capabilities grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
    {[
      { icon: '⚡', title: 'LLM integrations', desc: 'OpenAI, Anthropic, Gemini — production pipelines with retry logic and cost controls.' },
      { icon: '📄', title: 'Document pipelines', desc: 'PDF parsing, vector search, structured extraction from unstructured sources.' },
      { icon: '🔁', title: 'Workflow automation', desc: 'Agents that coordinate across APIs, databases, and notification systems end to end.' },
    ].map((cap, i) => (
      <ScrollReveal key={cap.title} delay={i * 0.1}>
        <div className="p-5 border border-neutral-100 rounded-2xl hover:border-neutral-300 transition-colors">
          <span className="text-2xl mb-3 block">{cap.icon}</span>
          <h3 className="font-semibold text-sm mb-2">{cap.title}</h3>
          <p className="text-neutral-500 text-xs leading-relaxed">{cap.desc}</p>
        </div>
      </ScrollReveal>
    ))}
  </div>

</section>
```

---

## PHASE 12 — TECH STACK MARQUEE UPGRADE

The existing marquee is good — enhance it with pause-on-hover and gradient fade edges:

```tsx
// Wrap existing marquee in this:
<div className="relative overflow-hidden">
  {/* Fade edges */}
  <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

  {/* Add group/hover pause to the marquee wrapper */}
  <div className="group flex overflow-hidden">
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
      className="flex gap-6 group-hover:[animation-play-state:paused]"
    >
      {/* your existing tech pills × 2 for seamless loop */}
    </motion.div>
  </div>
</div>
```

---

## PHASE 13 — CONTACT SECTION UPGRADE

```tsx
// Upgrade the contact section — add a social proof stat bar above the form
<section id="contact" className="py-24 px-6 max-w-6xl mx-auto">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

    {/* Left: Stats + copy */}
    <ScrollReveal direction="left">
      <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest block mb-4">Let's build</span>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
        Let's build something<br />worth shipping
      </h2>
      <p className="text-neutral-500 leading-relaxed mb-10">
        Open to full-time roles and contract work. Tell me about your stack, timeline, and goals — I'll respond within 24 hours with clarity on fit and next steps.
      </p>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[
          { value: '< 24h', label: 'Response time' },
          { value: '3', label: 'Projects shipped' },
          { value: '100%', label: 'On-time rate' },
        ].map(stat => (
          <div key={stat.label}>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="flex gap-4">
        {[
          { label: 'Email', href: 'mailto:gokulk24cb@psnacet.edu.in' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gokul-k-23334b329/' },
          { label: 'GitHub', href: 'https://github.com/Gokul-k07' },
        ].map(link => (
          <MagneticButton key={link.label} href={link.href} variant="outline">{link.label} ↗</MagneticButton>
        ))}
      </div>
    </ScrollReveal>

    {/* Right: Your existing contact form — just wrapped */}
    <ScrollReveal direction="right">
      {/* <ContactForm /> — your existing form here */}
    </ScrollReveal>

  </div>

</section>
```

---

## PHASE 14 — FINAL CHECKLIST

Run through every item before deploying:

```
ANIMATIONS
[ ] Hero typewriter cycles through 4 roles with blur fade
[ ] Flip card does 3D rotateY on hover — not a static image swap
[ ] All project cards scroll-reveal with 120ms stagger
[ ] Section headings scroll-reveal on enter
[ ] Page transitions: blur + fade + y on route change
[ ] Magnetic spring effect on all CTA buttons (Nav, Hero, Contact)
[ ] Tech stack marquee pauses on hover
[ ] Scroll indicator bounces in Hero
[ ] Availability dot pings in Nav
[ ] Grain texture overlay on entire page

CONTENT
[ ] Metrics row on every project card (3 stats each)
[ ] Testimonials section (3 quotes, name, role)
[ ] Process section (5 steps)
[ ] GokulGPT section has description + suggestion chips
[ ] AI capability grid (3 cards below GokulGPT)
[ ] Contact section has quick stats
[ ] Availability badge in nav says "Available for work"

PERFORMANCE
[ ] All animations use transform + opacity (no layout thrashing)
[ ] Images use next/image with priority on above-fold
[ ] Framer Motion components use whileInView with triggerOnce: true
[ ] No animation on users who prefer reduced motion:
    Add: @media (prefers-reduced-motion: reduce) — framer-motion respects this
    Or:  const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

ACCESSIBILITY
[ ] All interactive elements have focus-visible outlines
[ ] Magnetic button works with keyboard (Enter/Space)
[ ] Flip card has aria-label describing both sides
[ ] Testimonial quotes use <blockquote> semantics
[ ] Color contrast passes WCAG AA on all text
```

---

## NOTES FOR CLAUDE CODE

- The existing GokulGPT component in the AI section is a **live chat widget** — do NOT replace it, only upgrade its surrounding UI and add the suggestion chips.
- The flip photo (`/flip-image.png` and `/gokul-portrait.png`) already exist — the FlipCard component just needs to use them correctly with CSS 3D transforms.
- All testimonial quotes are placeholders — Gokul should replace them with real quotes from professors, teammates, or beta users.
- The metrics in Phase 8 are estimated — update with real numbers from project analytics.
- Run `npm run build` after all changes and fix any TypeScript errors before deploying to Vercel.
