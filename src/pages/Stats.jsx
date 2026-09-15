function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-950">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-white">50k+</p>
            <p className="mt-2 text-gray-400">Developers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">12k+</p>
            <p className="mt-2 text-gray-400">Companies</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">98%</p>
            <p className="mt-2 text-gray-400">Satisfaction</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">24h</p>
            <p className="mt-2 text-gray-400">Avg. Response</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;