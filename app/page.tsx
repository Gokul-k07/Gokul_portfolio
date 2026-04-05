import { AISection } from "@/components/sections/AISection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { TechStack } from "@/components/TechStack";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <Intro />
        <TechStack />
        <FeaturedProjects />
        <AISection />
        <SiteFooter />
      </main>
    </>
  );
}
