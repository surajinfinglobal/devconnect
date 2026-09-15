"use client";

import { motion } from "framer-motion";

export default function CTA({ className }) {
  const fullStar = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#A955F7" className="shrink-0">
      <path d="M9 1l2.4 5 5.5.8-4 3.9.9 5.4L9 13.5l-4.8 2.5.9-5.4-4-3.9 5.5-.8z"/>
    </svg>
  );

  const halfStar = (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="#A955F7"/>
          <stop offset="50%" stopColor="#333233"/>
        </linearGradient>
      </defs>
      <path d="M9 1l2.4 5 5.5.8-4 3.9.9 5.4L9 13.5l-4.8 2.5.9-5.4-4-3.9 5.5-.8z" fill="url(#half)"/>
    </svg>
  );

  const emptyStar = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#333233" className="shrink-0">
      <path d="M9 1l2.4 5 5.5.8-4 3.9.9 5.4L9 13.5l-4.8 2.5.9-5.4-4-3.9 5.5-.8z"/>
    </svg>
  );

  const column1 = [
    {
      avatar: "https://i.pravatar.cc/64?img=47",
      name: "Emily Smith",
      location: "Lyon, France",
      rating: 4.5,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I ever thought possible."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=33",
      name: "Michael Brown",
      location: "London, UK",
      rating: 5,
      text: "I was skeptical at first, but then I have completely transformed my relationship with money."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=48",
      name: "Sarah Jenkins",
      location: "Berlin, DE",
      rating: 5,
      text: "Absolutely phenomenal tools for wealth management. The visibility into my future spending is crystal clear now."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=47",
      name: "Emily Smith",
      location: "Lyon, France",
      rating: 4.5,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I ever thought possible."
    }
  ];

  const column2 = [
    {
      avatar: "https://i.pravatar.cc/64?img=11",
      name: "Wade Warren",
      location: "Michigan, US",
      rating: 4.5,
      text: "I've finally taken control of my finances. It's so easy to use and has helped me save more money than ever before."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=25",
      name: "Jane Cooper",
      location: "Montreal, Canada",
      rating: 5,
      text: "The app is intuitive and easy to navigate, and it's helped me reach my financial goals faster than I..."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=12",
      name: "Arthur Dent",
      location: "Woking, UK",
      rating: 4.5,
      text: "A Guide to the Financial Galaxy. This app is exactly what I needed to stop panicking about my savings."
    },
    {
      avatar: "https://i.pravatar.cc/64?img=11",
      name: "Wade Warren",
      location: "Michigan, US",
      rating: 4.5,
      text: "I've finally taken control of my finances. It's so easy to use and has helped me save more money than ever before."
    }
  ];

  const renderCard = (item, idx) => (
    <div
      key={idx}
      className="w-full bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-[24px] p-[28px] flex flex-col items-center text-center hover:border-[#A955F7]/30 transition-all duration-500 mb-5 last:mb-0"
    >
      <img
        src={item.avatar}
        alt={item.name}
        referrerPolicy="no-referrer"
        className="w-16 h-16 rounded-full border-2 border-white/10 shadow-lg object-cover mb-4 bg-white/5"
      />

      <h3 className="font-bold text-[16px] text-white tracking-tight mb-1">{item.name}</h3>
      <p className="text-[13px] text-white/40 mb-4">{item.location}</p>

      <div className="w-full h-[1px] bg-white/5 mb-4" />

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, sIdx) => {
          const starVal = sIdx + 1;
          if (item.rating >= starVal) return <div key={sIdx}>{fullStar}</div>;
          if (item.rating > sIdx && item.rating < starVal) return <div key={sIdx}>{halfStar}</div>;
          return <div key={sIdx}>{emptyStar}</div>;
        })}
      </div>

      <p className="text-[14px] text-white/60 leading-[1.7] font-medium italic">
        “{item.text}”
      </p>
    </div>
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section className={"bg-black py-[96px] px-6 md:px-[60px] font-['Inter',_sans-serif] relative overflow-hidden " + (className || "")}>
        {/* Ambient BG Glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#A955F7]/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-[1450px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[120px] items-start relative z-10">

          {/* LEFT COLUMN */}
          {/* <div className="w-full lg:w-[30%] lg:sticky lg:top-[96px] flex flex-col items-start h-auto lg:h-[700px]" > */}
            <div className="w-full lg:w-[30%] lg:sticky lg:top-[96px] flex flex-col justify-center items-center h-auto lg:h-[700px]" >

            {/* Header Metadata */}
            

            <h2 className="text-[42px] lg:text-[56px] font-medium leading-[1.1] text-white mb-6 tracking-tight max-w-[400px]">
              Ready to take control of your finances?
            </h2>

            <p className="text-[16px] text-white/50 leading-relaxed mb-8 max-w-[360px]">
              Join 14,000+ people who are already building better financial habits with Velara.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 w-full max-w-[280px] mb-10">
              <a
                href="#"
                className="inline-flex items-center justify-center h-[48px] px-6 rounded-full bg-[#A955F7] text-white font-semibold text-[15px] hover:bg-[#9845e6] transition-all duration-300 shadow-[0_0_30px_-8px_rgba(169,85,247,0.5)]"
              >
                Start Free Trial
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center h-[48px] px-6 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-[15px] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
              >
                Book a Demo
              </a>
            </div>

            {/* Rating Summary */}
            <div className="mt-auto flex flex-col gap-4 pt-6">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40?img=11" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover shadow-xl bg-gray-900" />
                <img src="https://i.pravatar.cc/40?img=45" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover -ml-3 shadow-xl bg-gray-900" />
                <img src="https://i.pravatar.cc/40?img=32" alt="User" className="w-10 h-10 rounded-full border-2 border-black object-cover -ml-3 shadow-xl bg-gray-900" />
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-[18px] text-white">4.8/5</span>
                <div className="flex items-center text-[#f4a722] text-[14px] gap-0.5">
                  ★ ★ ★ ★ ★
                </div>
              </div>

              <p className="text-[14px] text-white/40">Based on 14,000+ verifiable reviews</p>
            </div>
          </div>

          {/* RIGHT COLUMN — Animated Ticker (Image jaisa) */}
          <div className="w-full lg:w-[70%] h-[600px] lg:h-[750px] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">

              {/* Column 1 - Scroll Up */}
              <div className="relative overflow-hidden h-full">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col"
                >
                  {column1.map((item, idx) => renderCard(item, idx))}
                </motion.div>
              </div>

              {/* Column 2 - Scroll Down */}
              <div className="relative overflow-hidden h-full">
                <motion.div
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col"
                >
                  {column2.map((item, idx) => renderCard(item, idx))}
                </motion.div>
              </div>

            </div>

            {/* FADE OVERLAYS */}
            <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-[5]" />
            <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-[5]" />
          </div>

        </div>
      </section>
    </>
  );
}