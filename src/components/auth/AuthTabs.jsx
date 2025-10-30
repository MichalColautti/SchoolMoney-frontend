import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";

const AuthTabs = () => {
  const [tab, setTab] = useState("login");

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>SchoolMoney</h2>
        <p style={styles.subtitle}>System zarządzania zbiórkami pieniędzmi</p>

        <div style={styles.tabsContainer}>
          <button
            style={tab === "login" ? styles.activeTabButton : styles.tabButton}
            onClick={() => setTab("login")}
          >
            Logowanie
          </button>
          <button
            style={
              tab === "register" ? styles.activeTabButton : styles.tabButton
            }
            onClick={() => setTab("register")}
          >
            Rejestracja
          </button>
          <button
            style={tab === "reset" ? styles.activeTabButton : styles.tabButton}
            onClick={() => setTab("reset")}
          >
            Reset
          </button>
        </div>

        {tab === "login" && <Login />}
        {tab === "register" && <Register />}
        {tab === "reset" && <Reset />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    fontFamily: "'Krub', sans-serif",
  },
  box: {
    border: "4px solid #f0f9ff",
    borderRadius: "15px",
    padding: "1rem",
    textAlign: "center",
    background: "#fff",
    width: "350px",
    boxShadow: "0 0 8px #f0f9ff",
  },
  title: {
    color: "#2B7FFF",
  },
  subtitle: {
    color: "#64748B",
    marginBottom: "15px",
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "space-between",
    background: "#f0f9ff",
    padding: "6px",
    borderRadius: "20px",
  },
  tabButton: {
    flex: 1,
    padding: "6px",
    background: "none",
    border: "none",
  },
  activeTabButton: {
    flex: 1,
    padding: "6px",
    background: "#FFF",
    border: "none",
    borderRadius: "20px",
  },
};

export default AuthTabs;
