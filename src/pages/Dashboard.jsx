import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroGrid from "../../components/ui/smoothui/header-1";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <HeroGrid />

      <section style={styles.section}>
        <h2 style={styles.welcomeTitle}>Welcome, {user.name} 👋</h2>
        <p style={styles.welcomeSub}>
          You are signed in as <span style={styles.email}>{user.email}</span>
        </p>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Your Profile</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Name</span>
              <span style={styles.infoValue}>{user.name}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email</span>
              <span style={styles.infoValue}>{user.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>User ID</span>
              <span style={styles.infoValue}>#{user.id}</span>
            </div>
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "48px 24px",
    textAlign: "left",
  },
  welcomeTitle: {
    fontSize: "36px",
    fontWeight: 700,
    margin: "0 0 8px",
    color: "var(--text-h)",
    letterSpacing: "-0.8px",
  },
  welcomeSub: {
    fontSize: "16px",
    color: "var(--text)",
    margin: "0 0 32px",
  },
  email: {
    color: "var(--accent)",
    fontWeight: 500,
  },
  card: {
    padding: "32px",
    borderRadius: "16px",
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: 600,
    margin: "0 0 24px",
    color: "var(--text-h)",
  },
  infoGrid: {
    display: "grid",
    gap: "16px",
    marginBottom: "28px",
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    borderRadius: "10px",
    backgroundColor: "var(--accent-bg)",
    border: "1px solid var(--accent-border)",
  },
  infoLabel: {
    fontSize: "14px",
    fontWeight: 500,
    color: "var(--text)",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  infoValue: {
    fontSize: "15px",
    fontWeight: 600,
    color: "var(--text-h)",
  },
  logoutBtn: {
    width: "100%",
    padding: "12px",
    fontSize: "15px",
    fontWeight: 500,
    color: "#fff",
    backgroundColor: "var(--accent)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "opacity 0.15s",
  },
};

export default Dashboard;