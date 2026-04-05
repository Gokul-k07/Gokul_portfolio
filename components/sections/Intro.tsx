"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

export function Intro() {
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (splineContainerRef.current && !splineContainerRef.current.hasChildNodes()) {
      // Load the Spline viewer script
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.73/build/spline-viewer.js';
      document.head.appendChild(script);

      // Create the spline-viewer element
      const splineViewer = document.createElement('spline-viewer');
      splineViewer.setAttribute('url', 'https://prod.spline.design/ky8GD6Q5UD5S8qY9/scene.splinecode');
      splineViewer.style.width = '900px';
      splineViewer.style.height = '440px';
      splineViewer.style.marginLeft = '-100px';
      splineViewer.style.marginRight = '0px';
      splineViewer.style.minWidth = '';
      splineViewer.style.position = 'relative';
      splineViewer.style.left = '-100px';

      splineContainerRef.current.appendChild(splineViewer);
    }
  }, []);

  return (
    <section id="intro" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
        {/* 3D Robot Spline Embed */}
        <div
          className="w-full max-w-xs md:w-1/2 md:max-w-sm flex-shrink-0 md:self-start md:justify-start md:flex md:items-start md:pl-0 animate-load delay-0"
          style={{ marginLeft: -100 }}
        >
          <div className="rounded-2xl overflow-hidden bg-black/30 shadow-lg" ref={splineContainerRef} style={{ marginLeft: -100, marginRight: 0 }} />
        </div>
        {/* Intro Text */}
        <div className="flex-1">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl animate-load delay-1">
            Hi, I&apos;m {profile.name} &mdash; {profile.role}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl animate-load delay-2">
            I&apos;m based in <strong className="font-semibold text-foreground">{profile.location}</strong>. I
            build interfaces, APIs, data flows, and AI-assisted workflows end to end. The strongest signal in
            my work is not just visual polish&mdash;it is product judgment: solving coordination, automation,
            and security problems with software people will actually use. I work fast, communicate clearly,
            and care about code that can hold up in production.
          </p>
        </div>
      </div>
    </section>
  );
}
