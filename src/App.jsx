// Main application component.
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground";
import CursorGlow from "./components/CursorGlow/CursorGlow";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Interests from "./components/Interests/Interests";
import Footer from "./components/Footer/Footer";
import LoadingSkeleton from "./components/LoadingSkeleton/LoadingSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";
import SectionError from "./components/SectionError/SectionError";
import ConsentBanner from "./components/ConsentBanner/ConsentBanner";
import usePageReady from "./hooks/usePageReady";

const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));

export default function App() {
  const ready = usePageReady();

  return (
    <>
      <LoadingScreen isLoading={!ready} />
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Experience />
        <Education />
        <ErrorBoundary fallback={SectionError}>
          <Suspense
            fallback={
              <LoadingSkeleton label="Loading projects" minHeight={900} />
            }
          >
            <Projects />
          </Suspense>
        </ErrorBoundary>
        <Interests />
        <ErrorBoundary fallback={SectionError}>
          <Suspense
            fallback={
              <LoadingSkeleton label="Loading contact form" minHeight={700} />
            }
          >
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <ConsentBanner />
    </>
  );
}
