import { Link } from "react-router-dom";
// import PowerOffSlide from "../../components/ui/smoothui/form";
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individuals getting started.",
      features: ["Create Profile", "Apply to 10 jobs/month", "Basic Matching"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹999",
      description: "For serious job seekers.",
      features: [
        "Unlimited Applications",
        "Priority Matching",
        "Profile Boost",
        "Direct Messaging",
      ],
      cta: "Go Pro",
      popular: true,
    },
    {
      name: "Business",
      price: "Custom",
      description: "For companies hiring at scale.",
      features: [
        "Unlimited Job Posts",
        "Advanced Filters",
        "Dedicated Support",
        "Team Access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-gray-400">
            Choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "border-cyan-500 bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-black bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-white">
                {plan.price}
                {plan.price !== "Free" && plan.price !== "Custom" && (
                  <span className="text-base font-normal text-gray-400">
                    /mo
                  </span>
                )}
              </p>
              <p className="mt-2 text-gray-400 text-sm">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span className="text-cyan-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`mt-8 inline-flex w-full items-center justify-center px-6 py-3 text-sm font-medium rounded-full transition ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;