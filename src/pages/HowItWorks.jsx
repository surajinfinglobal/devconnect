function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and build a detailed profile showcasing your skills, experience, and projects.",
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our AI analyzes your profile and matches you with the most relevant job opportunities.",
    },
    {
      number: "03",
      title: "Connect & Interview",
      description: "Chat directly with companies, schedule interviews, and land your dream role faster.",
    },
    {
      number: "04",
      title: "Start Working",
      description: "Accept the offer and begin your new journey with top companies around the world.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            How it works
          </h2>
          <p className="mt-4 text-gray-400">
            Simple steps to connect with the best opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition duration-300"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;