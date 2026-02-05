import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ChatSidebar from "./chat/chatSidebar";

import ChatIcon from "./../assets/chat.svg";
import CoinIcon from "./../assets/coin.svg";
import ExitIcon from "./../assets/exit.svg";
import cancelIcon from "../assets/cancel.svg";

const Header = () => {
  const { logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddFundsModalOpen, setIsAddFundsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const handleAddFunds = () => {
    setIsAddFundsModalOpen(false);
    setAmount("");
  };

  return (
    <>
      <div style={styles.container}>
        <nav style={styles.navigation}>
          <NavLink
            to="/parent"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Panel Rodzica
          </NavLink>
          <NavLink
            to="/treasurer"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Panel Skarbnika
          </NavLink>
          <NavLink
            to="/account"
            style={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Konto
          </NavLink>
        </nav>

        <div style={styles.right}>
          <button style={styles.iconButton} onClick={toggleChat}>
            <img src={ChatIcon} alt="chat" width="14" height="14" />
            <span style={{ marginLeft: "8px" }}>Czat</span>
          </button>

          <button style={styles.button} onClick={() => setIsAddFundsModalOpen(true)}>
            <img
              src={CoinIcon}
              alt="coin"
              width="16"
              height="16"
              style={{ marginRight: "8px" }}
            />
            432,32 zł
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

      {isAddFundsModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Doładuj konto</h3>
              <button
                style={styles.closeButton}
                onClick={() => setIsAddFundsModalOpen(false)}
              >
                <img src={cancelIcon} alt="Zamknij" width="24" height="24" />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Kwota (zł)</label>
              <input
                type="number"
                min="1"
                style={styles.input}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Wpisz kwotę..."
              />
            </div>

            <div style={styles.modalActions}>
              <button style={styles.buttonBlue} onClick={handleAddFunds}>
                Zatwierdź
              </button>
              <button
                style={styles.buttonCancel}
                onClick={() => setIsAddFundsModalOpen(false)}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
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
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Krub', sans-serif",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formGroup: {
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#F0F9FF",
    fontSize: "16px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
  },
  buttonBlue: {
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  buttonCancel: {
    background: "#F1F5F9",
    color: "#64748B",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Header;
