import { useState } from "react";
import ChatDetail from "./chatDetail";
import SearchIcon from "../../assets/search.svg";
import AddChatIcon from "../../assets/addChat.svg";

const dummyChats = [
  { id: 1, name: "Tom Black", message: "Gdzie? Nie mogę cię znaleźć", time: "4 min", isOnline: false },
  { id: 2, name: "Julie", message: "Wrócę o 5", time: "47 min", isOnline: false },
  { id: 3, name: "Sheldon", message: "Dzięki bracie.", time: "2 days", isOnline: false },
  { id: 4, name: "France", message: "ok", time: "3 days", isOnline: false },
  { id: 5, name: "James Leaf", message: "Ostatni termin", time: "5 days", isOnline: false },
];

const ChatSidebar = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChat, setActiveChat] = useState(null);

  const filteredChats = dummyChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      
      <div style={styles.chatSidebar}>
        {activeChat ? (
          <ChatDetail 
            chat={activeChat} 
            onBack={() => setActiveChat(null)} 
          />
        ) : (
          <>
            {/* Header */}
            <div style={styles.chatHeaderRow}>
              <div style={styles.searchContainer}>
                <img src={SearchIcon} alt="search" width="14" height="21" style={{ opacity: 0.6 }} />
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

            <h3 style={styles.chatTitle}>Czaty</h3>

            <div style={styles.chatList}>
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id} 
                  style={styles.chatItem}
                  onClick={() => setActiveChat(chat)}
                >
                  <div style={styles.chatInfoTop}>
                    <span style={styles.chatName}>{chat.name}</span>
                    <span style={styles.chatTime}>{chat.time}</span>
                  </div>
                  <div style={styles.chatMessage}>{chat.message}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const styles = {
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

export default ChatSidebar;