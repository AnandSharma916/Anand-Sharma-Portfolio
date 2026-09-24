import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CommandPalette from "@/components/CommandPalette";
import HireMeModal from "@/components/HireMeModal";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import MoreProjects from "@/components/MoreProjects";
import Education from "@/components/Education";
// Recognition / Milestones section — temporarily disabled.
// To bring it back: uncomment this import, the <Achievements /> render below,
// and the "Awards" entry in navLinks (lib/data.js).
// import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-base">
      <Preloader />
      <SmoothScroll />
      <CommandPalette />
      <HireMeModal />
      <div className="aurora" />
      <div className="grid-tex" />
      <CursorGlow />
      <ScrollProgress />

      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <MoreProjects />
      <Education />
      {/* <Achievements /> */}
      <Contact />
      <Footer />
    </main>
  );
}
