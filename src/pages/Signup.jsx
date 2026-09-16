import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form, {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/smoothui/form";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ← toggle
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
    if (serverError) setServerError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (isSubmitting) return;

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);

    try {
     const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
});

     const text = await response.text();
     let data = {};
     try {
    data = text ? JSON.parse(text) : {};
} catch {
    data = {
        message: text || "Server returned an invalid response"
    };
}

      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setServerError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Sign up to get started</p>

        {serverError && <div style={styles.serverError}>{serverError}</div>}

        <Form errors={errors} onFormSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <FormField name="name">
            <FormLabel style={styles.label}>Full Name</FormLabel>
            <FormControl>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onFocus={(e) => {
                  if (!errors.name) {
                    e.target.style.border = "1px solid #06b6d4";
                  }
                }}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {}),
                  ...(shake && errors.name ? styles.shake : {}),
                }}
              />
            </FormControl>
            <FormMessage />
          </FormField>

          {/* Email */}
          <FormField name="email">
            <FormLabel style={styles.label} >Email</FormLabel>
            <FormControl>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(errors.email ? styles.inputError : {}),
                  ...(shake && errors.email ? styles.shake : {}),
                }}
              />
            </FormControl>
            <FormMessage />
          </FormField>

          {/* Password with Toggle */}
          <FormField name="password">
            <FormLabel style={styles.label}>Password</FormLabel>
            <FormControl>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    ...styles.input,
                    paddingRight: "45px",
                    ...(errors.password ? styles.inputError : {}),
                    ...(shake && errors.password ? styles.shake : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormField>

          <button type="submit" style={{ ...styles.button, opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }} disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </Form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  inputFocus: {
  border: "1px solid #06b6d4",   // cyan color on focus
},

  label: {
  display: "block",
  textAlign: "left",
  marginBottom: "6px",
  color: "#9ca3af",
  fontSize: "14px",
},
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "32px",
  },
  title: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "6px",
    textAlign: "left",
  },
  subtitle: {
    color: "#9ca3af",
    textAlign: "left",
    marginBottom: "24px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "#000",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  },
  inputError: {
    border: "1px solid #ef4444",
  },
  shake: {
    animation: "shake 0.4s ease-in-out",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    padding: "0",
    color: "#9ca3af",
  },
  button: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right, #06b6d4, #a855f7)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "8px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "14px",
  },
  link: {
    color: "#22d3ee",
    textDecoration: "none",
  },
  serverError: {
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    padding: "10px 14px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    textAlign: "left",
  },
};

export default Signup;