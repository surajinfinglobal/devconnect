import { useState } from "react";
// import BasicDropdown from "../../components/ui/smoothui/basic-dropdown";
function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    plan: "",
    location: "",
    date: "",
  });
  
//   const items = [
//   { id: 1, label: "Small" },
//   { id: 2, label: "Medium" },
//   { id: 3, label: "Large" },
//   { id: 4, label: "Extra Large" },
// ];
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.includes(name)) {
      setErrors((prev) => prev.filter((err) => err !== name));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login", {
            state: {
                from: "/contact"
            }
        });

        return;
    }
    setSuccess(false);
    
    
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "plan",
      "location",
      "date",
    ];
    const newErrors = requiredFields.filter((field) => !formData[field]);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setErrors([]);
    setSuccess(true);
    // Backend API call
    try {
        const response = await fetch("/api/contact", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (response.ok) {
            setSuccess(true);

            console.log("Saved successfully:", data);

            // Form reset
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                plan: "",
                location: "",
                date: "",
            });
        } else {
            console.error("Backend error:", data.message);
            alert(data.message || "Something went wrong");
        }

    } catch (error) {
        console.error("Contact form error:", error);
        alert("Unable to connect to server.");
    }
  };

  return (
    <section className="w-full bg-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-end">
          
          {/* Left Side - Image */}
          <div className="relative w-full lg:w-[480px] h-[420px] sm:h-[520px] lg:h-[640px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Developers collaborating"
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row">
              <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-md border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-lg">
                  💬
                </div>
                <div>
                  <p className="text-xs text-gray-400">Support</p>
                  <p className="text-sm font-semibold text-white">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-cyan-500 to-purple-500">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-lg">
                  ✉️
                </div>
                <div>
                  <p className="text-xs text-black/70">Email Us</p>
                  <p className="text-sm font-bold text-black">hello@devconnect.io</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 w-full max-w-xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              </div>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                Get In Touch
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              Let's Build Something<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Amazing Together
              </span>
            </h2>

            <p className="text-gray-400 mb-8 text-base">
              Whether you're a developer looking for opportunities or a company hiring talent — we're here to help.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition
                      ${errors.includes("firstName") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("firstName") ? "animate-shake" : ""}
                    `}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition
                      ${errors.includes("lastName") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("lastName") ? "animate-shake" : ""}
                    `}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition
                      ${errors.includes("email") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("email") ? "animate-shake" : ""}
                    `}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition
                      ${errors.includes("phone") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("phone") ? "animate-shake" : ""}
                    `}
                  />
                </div>
              </div>

              {/* Plan */}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Mumbai, India"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition
                      ${errors.includes("location") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("location") ? "animate-shake" : ""}
                    `}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white outline-none transition
                      ${errors.includes("date") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("date") ? "animate-shake" : ""}
                    `}
                  />
                </div>
              </div>

              {/* Location + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Mumbai, India"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition
                      ${errors.includes("location") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("location") ? "animate-shake" : ""}
                    `}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 text-left">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-white outline-none transition
                      ${errors.includes("date") ? "border-red-500" : "border-white/15 focus:border-cyan-500"}
                      ${shake && errors.includes("date") ? "animate-shake" : ""}
                    `}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-between px-6 py-3.5 rounded-xl bg-white text-black font-bold text-base hover:bg-gray-100 transition group"
              >
                <span>Send Message</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white text-lg group-hover:scale-105 transition">
                  →
                </div>
              </button>

              {success && (
                <p className="text-center text-cyan-400 font-medium mt-3">
                  ✓ Message sent successfully! We'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;