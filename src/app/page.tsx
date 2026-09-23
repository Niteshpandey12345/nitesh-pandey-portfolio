import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Recognition } from "@/components/sections/Recognition";
import { Skills } from "@/components/sections/Skills";
import { Research } from "@/components/sections/Research";
import { Experience } from "@/components/sections/Experience";
import { Leadership } from "@/components/sections/Leadership";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Recognition />
          <Skills />
          <Research />
          <Experience />
          <Leadership />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}