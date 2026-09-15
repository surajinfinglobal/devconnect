function Testimonials() {
  const reviews = [
    {
      name: "Aarav Sharma",
      role: "Frontend Developer",
      text: "DevConnect helped me land a remote role at a US startup within 2 weeks. The matching is seriously accurate.",
    },
    {
      name: "Priya Mehta",
      role: "HR Manager @ TechNova",
      text: "We hired 4 developers through this platform last quarter. Quality of talent is outstanding.",
    },
    {
      name: "Rohan Kapoor",
      role: "Full Stack Engineer",
      text: "Finally a platform that understands developers. Clean UI and real opportunities.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-950">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            What people are saying
          </h2>
          <p className="mt-4 text-gray-400">
            Real stories from developers and companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-gray-300 leading-relaxed mb-6">
                “{review.text}”
              </p>
              <div>
                <p className="text-white font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;