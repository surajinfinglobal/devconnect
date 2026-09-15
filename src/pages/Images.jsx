import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkle } from "lucide-react";

const HEADLINE =
  "Whether you seek adventure, culture, or calm we've got the perfect experience for every kind of traveler.";

const TABS = ["All", "Wildlife", "Relaxation", "Adventure", "Historical"];

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
    alt: "Snowy mountain",
  },
  {
    src: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=600",
    alt: "Hikers on mountain ridge",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
    alt: "Lake",
  },
  {
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
    alt: "Waterfall",
  },
  {
    src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&q=80&w=600",
    alt: "Mountain peak",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
    alt: "Fjord",
  },
  {
    src: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600",
    alt: "Adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=600",
    alt: "Hillside",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600",
    alt: "Forest",
  },
];

function RevealWord({ word, i, total, progress }) {
  const range = [i / total, i / total + 1 / total];
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#4b5563", "#ffffff"]);

  return (
    <span className="relative mr-3 lg:mr-4 inline-block">
      <motion.span style={{ opacity, color }}>{word}</motion.span>
    </span>
  );
}

function TabBar() {
  const [active, setActive] = useState("All");

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-[80px]">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={
            active === tab
              ? "px-[24px] py-[12px] rounded-full text-[14px] transition-all cursor-pointer bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold shadow-lg shadow-cyan-500/20"
              : "px-[24px] py-[12px] rounded-full text-[14px] transition-all cursor-pointer bg-white/10 text-gray-300 font-medium hover:bg-white/20 hover:text-white border border-white/10"
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function Images() {
  const headlineRef = useRef(null);
  const { scrollYProgress: progress } = useScroll({
    target: headlineRef,
    offset: ["start 0.85", "end 0.2"],
  });

  const words = HEADLINE.split(" ");
  const strip = [...IMAGES, ...IMAGES];

  return (
    <section className="relative w-full bg-black pt-[100px] pb-[100px] overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 120%, transparent 0%, transparent 20%, #fff 21%, transparent 22%, transparent 40%, #fff 41%, transparent 42%, transparent 60%, #fff 61%, transparent 62%, transparent 80%, #fff 81%, transparent 82%)",
          backgroundSize: "2000px 2000px",
          backgroundPosition: "center bottom",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Label */}
        <div className="flex items-center gap-1.5 mb-8">
          <div className="w-[44px] h-[44px] rounded-full border border-white/20 flex items-center justify-center bg-white/5 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkle size={18} className="text-cyan-400 fill-cyan-400" />
            </motion.div>
          </div>
          <div className="px-[12px] py-[12px] rounded-full border border-white/20 flex items-center justify-center bg-white/5">
            <span className="text-[16px] font-medium text-gray-300 px-3 whitespace-nowrap">
              Our Tour Activities
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[32px] sm:text-[44px] md:text-[58px] font-medium text-white leading-[1.1] max-w-[900px] mb-8 md:mb-[48px] tracking-tight flex flex-wrap justify-center text-center px-4 md:px-0"
        >
          {words.map((word, i) => (
            <RevealWord
              key={i}
              word={word}
              i={i}
              total={words.length}
              progress={progress}
            />
          ))}
        </h2>

        {/* Tabs */}
        <TabBar />

        {/* Infinite Image Strip */}
        <div className="relative w-full">
          <motion.div
            className="flex gap-[16px] w-max select-none"
            animate={{ x: [0, -2484] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {strip.map((image, index) => {
              const mod = index % 3;
              const heightClass =
                mod === 0
                  ? "h-[240px] self-start mt-10"
                  : mod === 1
                  ? "h-[320px] self-center"
                  : "h-[280px] self-end mb-10";

              return (
                <div
                  key={index}
                  className={`flex-shrink-0 w-[260px] rounded-[32px] overflow-hidden shadow-lg shadow-black/50 border border-white/10 ${heightClass}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Images;