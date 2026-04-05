"use client";

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface SmoothScrollContextType {
  isReady: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ isReady: false });

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
  hasFixedHeader?: boolean;
}

export function SmoothScrollProvider({ children, hasFixedHeader = true }: SmoothScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const velocityRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef(Date.now());

  // Lerp function for smooth easing
  const lerp = (start: number, end: number, amount: number) => {
    return start + (end - start) * amount;
  };

  // Update target scroll based on window scroll event
  const handleWindowScroll = () => {
    targetScrollRef.current = window.scrollY;
    isScrollingRef.current = true;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Detect scroll end with longer delay for better inertia
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 200);
  };

  // Smooth scroll animation loop
  const animate = () => {
    const now = Date.now();
    const deltaTime = (now - lastTimeRef.current) / 16.67; // Normalize to 60fps
    lastTimeRef.current = now;

    const difference = targetScrollRef.current - currentScrollRef.current;

    // Lerp amount: controls smoothness (0.08 = smooth, 0.12 = snappy)
    const easing = 0.08;
    currentScrollRef.current = lerp(currentScrollRef.current, targetScrollRef.current, easing);

    // Apply inertia/momentum effect
    if (isScrollingRef.current) {
      velocityRef.current = difference * 0.5;
    } else {
      // Natural deceleration when not scrolling (momentum)
      velocityRef.current *= 0.92; // Friction factor
      currentScrollRef.current += velocityRef.current;
    }

    // Apply CSS transform for smooth rendering
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${currentScrollRef.current}px)`;
    }

    // Continue animation if there's still movement
    const shouldContinue = Math.abs(velocityRef.current) > 0.1 || Math.abs(difference) > 1;
    if (shouldContinue) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    // Set up animation loop
    const startAnimation = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    // Listen to window scroll events
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    startAnimation();

    // Update scroll height dynamically
    const updateScrollHeight = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.scrollHeight;
        document.documentElement.style.height = `${containerHeight}px`;
      }
    };

    // Initial height update
    updateScrollHeight();

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      updateScrollHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    setIsReady(true);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ isReady }}>
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          transformOrigin: "top left",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}
