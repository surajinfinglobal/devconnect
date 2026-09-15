import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Scroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Image effects
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const imageBlur = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  // Text effects
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[180vh] bg-black">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          style={{
            scale: imageScale,
            opacity: imageOpacity,
            filter: useTransform(imageBlur, (v) => `blur(${v}px)`),
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <p className="text-cyan-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-none tracking-tight">
            DEVCONNECT
          </h1>
          <p className="mt-6 text-gray-300 text-lg sm:text-xl max-w-lg">
            Connecting top developers with innovative companies worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Scroll;