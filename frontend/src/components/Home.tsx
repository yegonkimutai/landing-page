import Navbar from "./Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  return (
    <div className="min-h-screen bg-[#020812] text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
