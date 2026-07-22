import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Interests from "./components/Interests/Interests";
import Footer from "./components/Footer/Footer";
import LoadingSkeleton from "./components/Projects/LoadingSkeleton";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import useLoading from "./hooks/useLoading";
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const loading = useLoading();
function App() {
  return (
    <>
      <LoadingScreen isLoading={loading} />
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Education />
            <ErrorBoundary>
              <Suspense fallback={<LoadingSkeleton />}>
                <Projects />
              </Suspense>
            </ErrorBoundary>
            <Interests />
            <ErrorBoundary>
              <Suspense fallback={<LoadingSkeleton />}>
                <Contact />
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
