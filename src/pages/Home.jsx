import Navbar from "../../components/Navbar";     // Navbar components folder se
import Footer from "../../components/Footer";     // Footer components folder se
import { motion, useMotionValue, useSpring } from "framer-motion";
import Hero from "../../components/Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Stats from "./Stats";
import Images from "./Images";
import Contact from  "./Contact";
import CTA from "./CTA";

function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 180,
    damping: 25,
  });

  const springY = useSpring(mouseY, {
    stiffness: 180,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div
      className="bg-black min-h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* NEON CURSOR GLOW */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="
          pointer-events-none
          fixed
          top-0
          left-0
          z-[9999]
          -translate-x-1/2
          -translate-y-1/2
          w-[350px]
          h-[350px]
          rounded-full
          bg-[#A955F7]/20
          blur-[90px]
        "
      />

      {/* INNER NEON AURA */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="
          pointer-events-none
          fixed
          top-0
          left-0
          z-[9999]
          -translate-x-1/2
          -translate-y-1/2
          w-[120px]
          h-[120px]
          rounded-full
          bg-[#A955F7]/30
          blur-[45px]
        "
      />

      {/* SECTIONS */}
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Images />
      <Contact/>
      <Footer />

    </div>
  );
}

export default Home;