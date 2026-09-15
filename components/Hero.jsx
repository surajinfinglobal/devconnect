import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import './style.css';

function Hero() {
  const containerRef = useRef(null);
  const [focused, setFocused] = useState(false);

  // Mouse-tracking parallax for the right illustration
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const illustrationX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const illustrationY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const glowX = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const glowY = useTransform(springY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Shared animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-12 overflow-hidden bg-black sm:pb-16 lg:pb-20 xl:pb-24 mt-12"
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">

          {/* Left Content */}
          <div>
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl font-normal text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Connecting{" "}
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Devs
              </motion.span>{" "}
              with Employers
            </motion.h1>

            <motion.p
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-4 text-lg font-normal text-gray-400 sm:mt-8"
            >
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim velit mollit. Exercitation
              veniam consequat.
            </motion.p>

            {/* Search Form */}
            <motion.form
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative mt-8 rounded-full sm:mt-12"
            >
              <motion.div
                className="relative"
                animate={{ scale: focused ? 1.02 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated gradient border */}
                <motion.div
                  className="absolute rounded-full -inset-px"
                  style={{
                    background:
                      "linear-gradient(90deg, #06b6d4, #a855f7, #06b6d4)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                    <motion.svg
                      className="w-5 h-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      animate={{ scale: focused ? 1.1 : 1, rotate: focused ? -8 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </motion.svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Try Java Developer, React Dev etc."
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="block w-full py-4 pr-6 text-white placeholder-gray-500 bg-black border border-transparent rounded-full pl-14 sm:py-5 focus:border-transparent focus:ring-0 outline-none"
                  />
                </div>
              </motion.div>

              <div className="sm:absolute flex sm:right-1.5 sm:inset-y-1.5 mt-4 sm:mt-0">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black uppercase transition-all duration-200 bg-white rounded-full sm:w-auto sm:py-3 hover:opacity-90 overflow-hidden group"
                >
                  <span className="relative z-10">Find A Developer</span>
                  {/* Shine sweep on hover */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </div>
            </motion.form>

            {/* Reviews */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 sm:mt-12"
            >
              <p className="text-lg font-normal text-white">
                Trusted by 50k+ users
              </p>

              <div className="flex items-center mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.8 + i * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 14,
                      }}
                      whileHover={{ scale: 1.25, rotate: 8 }}
                    >
                      <path
                        d="M10.8586 4.71248C11.2178 3.60691 12.7819 3.60691 13.1412 4.71248L14.4246 8.66264C14.5853 9.15706 15.046 9.49182 15.5659 9.49182H19.7193C20.8818 9.49182 21.3651 10.9794 20.4247 11.6626L17.0645 14.104C16.6439 14.4095 16.4679 14.9512 16.6286 15.4456L17.912 19.3958C18.2713 20.5013 17.0059 21.4207 16.0654 20.7374L12.7052 18.2961C12.2846 17.9905 11.7151 17.9905 11.2945 18.2961L7.93434 20.7374C6.99388 21.4207 5.72851 20.5013 6.08773 19.3958L7.37121 15.4456C7.53186 14.9512 7.35587 14.4095 6.93529 14.104L3.57508 11.6626C2.63463 10.9794 3.11796 9.49182 4.28043 9.49182H8.43387C8.95374 9.49182 9.41448 9.15706 9.57513 8.66264L10.8586 4.71248Z"
                        fill="url(#star-gradient)"
                      />
                      <defs>
                        <linearGradient
                          id="star-gradient"
                          x1="3.07813"
                          y1="3.8833"
                          x2="23.0483"
                          y2="6.90161"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  ))}
                </div>

                <span className="ml-2 text-base font-normal text-white">
                  4.1/5
                </span>
                <span className="ml-1 text-base font-normal text-gray-500">
                  (14k Reviews)
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Side Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            {/* Glow Effect with parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ x: glowX, y: glowY }}
            >
              <svg
                className="blur-3xl filter opacity-70"
                style={{ filter: "blur(64px)" }}
                width="444"
                height="536"
                viewBox="0 0 444 536"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M225.919 112.719C343.98 64.6648 389.388 -70.487 437.442 47.574C485.496 165.635 253.266 481.381 135.205 529.435C17.1445 577.488 57.9596 339.654 9.9057 221.593C-38.1482 103.532 107.858 160.773 225.919 112.719Z"
                  fill="url(#c)"
                />
                <defs>
                  <linearGradient
                    id="c"
                    x1="82.7339"
                    y1="550.792"
                    x2="-39.945"
                    y2="118.965"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Noise Texture */}
            <div className="absolute inset-0 pointer-events-none">
              <img
                className="object-cover w-full h-full opacity-50"
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/noise.png"
                alt=""
              />
            </div>

            {/* Main Illustration with parallax + float */}
            <motion.div
              style={{ x: illustrationX, y: illustrationY }}
              className="relative"
            >
              <motion.img
                className="relative w-full max-w-md mx-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/2/illustration.png"
                alt="Hero Illustration"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Floating accent dots */}
            {[
              { top: "10%", left: "5%", delay: 0 },
              { top: "70%", left: "88%", delay: 0.5 },
              { top: "45%", left: "-2%", delay: 1 },
              { top: "85%", left: "15%", delay: 1.5 },
            ].map((dot, i) => (
              <motion.span
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                style={{ top: dot.top, left: dot.left }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.delay,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;