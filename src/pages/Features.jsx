function Features() {
  const features = [
    {
      title: "Smart Matching",
      description: "AI-powered matching that connects the right developers with the right companies.",
      icon: "🎯",
    },
    {
      title: "Verified Profiles",
      description: "Every developer is skill-verified so you hire with confidence.",
      icon: "✅",
    },
    {
      title: "Fast Hiring",
      description: "Reduce time-to-hire by up to 60% with our streamlined process.",
      icon: "⚡",
    },
    {
      title: "Global Talent",
      description: "Access top developers from all around the world in one place.",
      icon: "🌍",
    },
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 ">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Everything you need to hire better
          </h2>
          <p className="mt-4 text-gray-400">
            Powerful tools designed to make hiring developers simple and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition duration-300"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;