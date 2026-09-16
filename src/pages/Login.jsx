import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Form, {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/smoothui/form";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const location = useLocation(); 
  
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ← toggle state

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

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        const redirectTo =
        location.state?.from || "/";
        navigate(location.state?.from || "/", { replace: true });
      } else {
        setServerError(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {serverError && <div style={styles.serverError}>{serverError}</div>}

        <Form errors={errors} onFormSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <FormField name="email">
            <FormLabel style={styles.label}>Email</FormLabel>
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
            <FormLabel style={styles.label} >Password</FormLabel>
            <FormControl>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
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

          <div style={styles.forgot}>
            <Link to="#" style={styles.link}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </Form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
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
  label: {
    display: "block",
    textAlign: "left",
    marginBottom: "6px",
    color: "#9ca3af",
    fontSize: "14px",
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
  forgot: {
    textAlign: "left",
    marginTop: "-8px",
  },
  footer: {
    marginTop: "20px",
    textAlign: "left",
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

export default Login;