import AnimatedGradient from "@/components/ui/AnimatedGradient";
import ParticleField from "@/components/three/ParticleField";
import Main3DCanvasWrapper from "@/components/three/Main3DCanvasWrapper";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Gallery from "@/components/sections/Gallery";
import Requirements from "@/components/sections/Requirements";
import DownloadSection from "@/components/sections/Download";
import Documentation from "@/components/sections/Documentation";
import ReleaseNotes from "@/components/sections/ReleaseNotes";
import FAQSection from "@/components/sections/FAQ";
import Support from "@/components/sections/Support";

export default function Home() {
  return (
    <>
      <AnimatedGradient />
      <ParticleField />
      <Main3DCanvasWrapper />
      <Hero />
      <Features />
      <HowItWorks />
      <Gallery />
      <Requirements />
      <DownloadSection />
      <Documentation />
      <ReleaseNotes />
      <FAQSection />
      <Support />
    </>
  );
}
