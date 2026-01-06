import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import ChatIcon from "../assets/chat.svg";
import SearchIcon from "../assets/search.svg";
import AddChatIcon from "../assets/addChat.svg";
import CoinIcon from "../assets/coin.svg";
import ExitIcon from "../assets/exit.svg";

const chats = [
  {
    id: 1,
    name: "Tom Black",
    message: "Where I can't find you",
    time: "4 min",
    isOnline: false,
  },
  {
    id: 2,
    name: "Julie",
    message: "I'll be back at 5",
    time: "47 min",
    isOnline: false,
  },
  {
    id: 3,
    name: "Sheldon",
    message: "Thanks mate.",
    time: "2 days",
    isOnline: false,
  },
  {
    id: 4,
    name: "France",
    message: "ok",
    time: "3 days",
    isOnline: false,
  },
  {
    id: 5,
    name: "James Leaf",
    message: "The deadline for the project is now on Friday instead of next Monday, plea...",
    time: "5 days",
    isOnline: false,
  },
];

const Header = () => {
  const { logout } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
          <button style={styles.iconButton} onClick={toggleChat}>
            <img src={ChatIcon} alt="chat" width="14" height="14" />
            <span style={{ marginLeft: "8px" }}>Czat</span>
          </button>

          <button style={styles.button}>
            <img src={CoinIcon} alt="coin" width="16" height="16" style={{ marginRight: "8px" }} />
            432,32 zł
          </button>

          <button style={styles.button} onClick={logout}>
            <img src={ExitIcon} alt="exit" width="16" height="16" style={{ marginRight: "8px" }} />
            Wyloguj
          </button>
        </div>
      </div>

      {isChatOpen && (
        <>
          <div style={styles.overlay} onClick={() => setIsChatOpen(false)} />

          <div style={styles.chatSidebar}>
            <div style={styles.chatHeaderRow}>
              <div style={styles.searchContainer}>
                <img
                  src={SearchIcon}
                  alt="search"
                  width="14"
                  height="21"
                  style={{ opacity: 0.6 }}
                />
                <input
                  type="text"
                  placeholder="Search"
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button style={styles.addChatBtn}>
                <img src={AddChatIcon} alt="new chat" width="24" height="24" />
              </button>
            </div>

            <h3 style={styles.chatTitle}>Chats</h3>

            <div style={styles.chatList}>
              {filteredChats.map((chat) => (
                <div key={chat.id} style={styles.chatItem}>
                  <div style={styles.chatInfoTop}>
                    <span style={styles.chatName}>{chat.name}</span>
                    <span style={styles.chatTime}>{chat.time}</span>
                  </div>
                  <div style={styles.chatMessage}>{chat.message}</div>
                </div>
              ))}
            </div>
          </div>
        </>
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
    border: "1px solid #e0e3e7",
    background: "#fff",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
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
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    zIndex: 100,
  },
  chatSidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "350px",
    height: "100vh",
    backgroundColor: "#fff",
    boxShadow: "-4px 0 15px rgba(0,0,0,0.1)",
    zIndex: 101,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: "'Krub', sans-serif",
  },
  chatHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  searchContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#4A4A4A",
    borderRadius: "8px",
    padding: "8px 12px",
    gap: "8px",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "14px",
    width: "100%",
    fontFamily: "'Krub', sans-serif",
  },
  addChatBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatTitle: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    overflowY: "auto",
  },
  chatItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    cursor: "pointer",
  },
  chatInfoTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  chatName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#333",
  },
  chatTime: {
    fontSize: "12px",
    color: "#e0e3e7",
    opacity: 0.5,
  },
  chatMessage: {
    fontSize: "13px",
    color: "#888",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: "1.4",
  },
};

export default Header;