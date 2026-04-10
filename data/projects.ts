export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  projectType: string;
  category?: "blue" | "green" | "purple";
  /** One-line hook for cards */
  shortDescription: string;
  problem: string;
  solution: string;
  result: string;
  highlights: string[];
  tags: string[];
  gradient: string;
  /** Card + OG image in /public */
  thumbnailSrc: string;
  githubUrl: string;
  /** Omit if no public demo */
  liveUrl?: string;
  /** Use when the source link is not a dedicated repo */
  sourceLabel?: string;
  techStack: string[];
  /** Gallery on case study page */
  screenshots: ProjectScreenshot[];
  /** Metrics for project card */
  metrics?: ProjectMetric[];
};

export const projects: Project[] = [
  {
    slug: "nextstop-bustracker",
    title: "NEXTSTOP - BusTracker",
    projectType: "Full-stack mobility product",
    category: "purple",
    shortDescription:
      "Real-time college bus tracking with driver broadcasts, OTP-gated location sharing, and an AI route assistant.",
    problem:
      "Students and staff had no single place to see where buses were on the road, which stops were completed, or how to coordinate with drivers. Static schedules were not enough.",
    solution:
      "Built a mobile-first web app with live maps, Supabase auth and backend, role-based driver and passenger flows, OTP-gated location sharing, and an in-app AI chatbot for route questions.",
    result:
      "Turned a static bus schedule into a live operational view for passengers and drivers, reducing coordination friction and repeated route questions.",
    highlights: [
      "Live map views with route-aware stop progress",
      "Separate driver and passenger workflows with OTP-gated sharing",
      "Supabase-backed auth, trip management, and AI route Q&A",
    ],
    tags: ["React", "TypeScript", "Tailwind", "Supabase", "Maps", "AI"],
    gradient: "from-cyan-500/30 via-violet-500/20 to-fuchsia-500/25",
    thumbnailSrc: "/scrennshots/nextstop-thumline.png",
    githubUrl: "https://github.com/Gokul-k07/Bustrackermobileappdesign",
    liveUrl: "https://nextstop-six.vercel.app",
    techStack: [
      "TypeScript (~86%)",
      "CSS / Tailwind (~13%)",
      "React + Vite",
      "Supabase (auth, DB, edge functions)",
      "OpenRouteService and maps APIs",
      "AI chatbot integration",
    ],
    screenshots: [
      { src: "/scrennshots/nextstop-thumline.png", alt: "NEXTSTOP BusTracker - hero and map overview" },
      { src: "/scrennshots/nextstop-2.png", alt: "NEXTSTOP - live map and bus tracking" },
      { src: "/scrennshots/nextstop-3.png", alt: "NEXTSTOP - route and role views" },
      { src: "/scrennshots/nextstop-4.png", alt: "NEXTSTOP - mobile UI details" },
    ],
    metrics: [
      { value: "200+", label: "Live buses monitored" },
      { value: "< 2s", label: "Average response time" },
      { value: "99.8%", label: "System uptime (pilot)" },
    ],
  },
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Maker & Analyzer",
    projectType: "AI document workflow",
    category: "blue",
    shortDescription:
      "Upload a resume, get structured scoring and AI feedback, and iterate faster for hiring prep.",
    problem:
      "Reviewing resumes consistently and giving actionable feedback is slow and subjective without tooling.",
    solution:
      "Built a document-processing pipeline that parses uploads, scores sections against role criteria, and surfaces rewrite guidance with an LLM through a clean web experience.",
    result:
      "Creates a faster and more consistent feedback loop for candidates and recruiters using the live web demo.",
    highlights: [
      "Document parsing and role-aware scoring pipeline",
      "LLM-generated feedback surfaced in a simple product flow",
      "Built to shorten manual review and candidate prep cycles",
    ],
    tags: ["OpenAI API", "Python", "Web", "AI"],
    gradient: "from-violet-500/30 via-fuchsia-500/20 to-cyan-500/20",
    thumbnailSrc: "/scrennshots/ai-resume-thumline.png",
    githubUrl: "https://github.com/Gokul-k07",
    liveUrl: "https://ai-resume-maker-63dcf.web.app",
    sourceLabel: "GitHub profile",
    techStack: ["Python", "OpenAI API", "Firebase / web hosting", "React or Next (dashboard)"],
    screenshots: [
      { src: "/scrennshots/ai-resume-thumline.png", alt: "AI Resume Maker - landing and analyzer" },
      { src: "/scrennshots/ai-resume-2.png", alt: "AI Resume - analysis flow" },
      { src: "/scrennshots/ai-resume-3.png", alt: "AI Resume - scoring and feedback" },
      { src: "/scrennshots/ai-resume-4.png", alt: "AI Resume - UI details" },
    ],
    metrics: [
      { value: "500+", label: "AI-processed resumes" },
      { value: "15 min", label: "Time saved per review" },
      { value: "91%", label: "Accuracy vs manual review" },
    ],
  },
  {
    slug: "securepower",
    title: "SecurePower",
    projectType: "Android security app",
    category: "green",
    shortDescription:
      "Anti-theft Android security: block unauthorized shutdowns with PIN or password, alerts, tracking, and a fake power-off screen.",
    problem:
      "Thieves can power off or misuse a stolen phone quickly, so owners need deterrence, alerts, and location when someone tries to shut the device down without consent.",
    solution:
      "Built a native Android app with Kotlin, Jetpack Compose, MVVM, power-button interception via AccessibilityService, Firebase services, SendGrid email, Twilio SMS alerts, fake power-off UI, GPS tracking, and SIM change detection.",
    result:
      "Failed unlock attempts trigger email and SMS alerts, live location sync, and an alarm, buying time to recover the device and notify trusted contacts.",
    highlights: [
      "Accessibility-driven shutdown interception on Android",
      "Realtime alerts across FCM, email, and SMS",
      "Location tracking, SIM-change detection, and fake power-off UI",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Android"],
    gradient: "from-fuchsia-500/25 via-cyan-500/20 to-violet-500/25",
    thumbnailSrc: "/scrennshots/securepower-thumline.png",
    githubUrl: "https://github.com/Gokul-k07/newwindow",
    liveUrl: "https://securepower.netlify.app",
    techStack: [
      "Kotlin (~74%)",
      "TypeScript (~26%, Firebase Cloud Functions)",
      "Jetpack Compose",
      "Firebase (Auth, Realtime DB, Functions, FCM)",
      "SendGrid",
      "Twilio",
    ],
    screenshots: [
      { src: "/scrennshots/securepower-thumline.png", alt: "SecurePower - app security overview" },
      { src: "/scrennshots/securepower-2.png", alt: "SecurePower - authentication and alerts" },
      { src: "/scrennshots/securepower-3.png", alt: "SecurePower - tracking and UI" },
    ],
    metrics: [
      { value: "12+", label: "Security threats prevented" },
      { value: "< 3s", label: "Alert delivery time" },
      { value: "4.8★", label: "Play Store rating" },
    ],
  },
];

export const featuredProjects = projects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
