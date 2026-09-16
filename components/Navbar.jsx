import { Link ,useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
import { useAuth } from "../src/context/AuthContext";
import "./style.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
        isAuthenticated,
        user,
        logout
    } = useAuth();
  const handleLogout = () => {
    logout();
   

    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          Devconnect
        </Link>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>

        </div>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
          </>
        )}
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;