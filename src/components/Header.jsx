import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <div style={styles.container}>
      <nav style={styles.navigation}>
        <NavLink
          to="/parent"
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Panel Rodzica
        </NavLink>
        <NavLink
          to="/treasurer"
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Panel Skarbnika
        </NavLink>
        <NavLink
          to="/account"
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Konto
        </NavLink>
      </nav>
      <div style={styles.right}>
        <button style={styles.button}>Czat</button>
        <button style={styles.button}>432,32</button>
        <button style={styles.button} onClick={logout}>Wyloguj</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    borderBottom: "1px solid #e0e3e7",
    padding: "8px 24px",
    fontFamily: "'Krub',sans-serif",
    minHeight: "50px",
    position: "sticky",
    top: 0,
    zIndex: 99,
  },
  navigation: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  link: {
    color: "#64748B",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "20px",
  },
  activeLink: {
    color: "#2B7FFF",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "20px",
  },
  right: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  button: {
    border: "1px solid #000",
    background: "#fff",
    borderRadius: "8px",
    padding: "2px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Header;
