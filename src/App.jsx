import Nav from "./components/Nav.jsx";
import Thread from "./components/Thread.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Recognition from "./components/Recognition.jsx";
import Ending from "./components/Ending.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="relative">
        {/* the throughline draws beneath everything; content paints above it */}
        <Thread />
        <div className="relative z-[1]">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Recognition />
        </div>
      </main>
      <Ending />
    </div>
  );
}
