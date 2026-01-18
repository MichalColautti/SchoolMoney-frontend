import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ChatSidebar from "./chat/chatSidebar";

import ChatIcon from "./../assets/chat.svg";
import ExitIcon from "./../assets/exit.svg";

const HeaderAdmin = () => {
  const { logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      <div style={styles.container}>
        <nav style={styles.navigation}>
          <NavLink
            to="/admin"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Panel Admina
          </NavLink>
        </nav>

        <div style={styles.right}>
          <button style={styles.iconButton} onClick={toggleChat}>
            <img src={ChatIcon} alt="chat" width="14" height="14" />
            <span style={{ marginLeft: "8px" }}>Czat</span>
          </button>

          <button style={styles.button} onClick={logout}>
            <img
              src={ExitIcon}
              alt="exit"
              width="16"
              height="16"
              style={{ marginRight: "8px" }}
            />
            Wyloguj
          </button>
        </div>
      </div>

      {isChatOpen && <ChatSidebar onClose={() => setIsChatOpen(false)} />}
    </>
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
    fontFamily: "'Krub', sans-serif",
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
    border: "0px solid #2B7FFF",
    background: "#fff",
    borderRadius: "8px",
    padding: "10px 16px",
    fontSize: "14px",
    boxShadow: "0px 0px 1px 1px rgba(43, 127, 255, 1)",
    cursor: "pointer",
    fontFamily: "'Krub', sans-serif",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    border: "1px solid #e0e3e7",
    background: "#fff",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "16px",
    cursor: "pointer",
    fontFamily: "'Krub', sans-serif",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    color: "#333",
  },
};

export default HeaderAdmin;
