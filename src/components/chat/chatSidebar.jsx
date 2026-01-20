import { useState, useEffect } from "react";
import ChatDetail from "./chatDetail";
import SearchIcon from "../../assets/search.svg";
import AddChatIcon from "../../assets/addChat.svg";
import {useAuth} from "../../contexts/AuthContext";
import { getChatChannels, createChat } from "../../services/chat";
import { findParent,  } from "../../services/parent";
import { useFormatDate } from '../../hooks/useFormatDate'
import {REACT_APP_API_BASE_URL} from "../../services/utils/request";

const ChatSidebar = ({ onClose }) => {
  const { token, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [foundParents, setFoundParents] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const { formatToDateString } = useFormatDate();

  useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedSearchTerm(searchTerm);
      }, 1000);
      return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
      if (debouncedSearchTerm.trim() && token) {
          findParent(debouncedSearchTerm, token)
              .then(data => setFoundParents(data))
              .catch(console.error);
      } else {
          setFoundParents([]);
      }
  }, [debouncedSearchTerm, token]);

  useEffect(() => {
    if (token) {
        getChatChannels(token)
            .then(data => {
                const mappedChats = data.map(ch => ({
                    id: ch.channelId,
                    name: `${ch.user.name} ${ch.user.surname}`,
                    imageId: ch.user.imageId,
                    message: ch.lastMessage?.textContent || (ch.lastMessage?.imageContent || ch.lastMessage?.imageId ? "Zdjęcie" : ""),
                    time: ch.lastMessage?.createdAt ? formatToDateString(new Date(ch.lastMessage.createdAt)) : "",
                    isOnline: false,
                    original: ch
                }));
                setChats(mappedChats);
            })
            .catch(console.error);
    }
  }, [token, formatToDateString]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chat.message && chat.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const existingChatUserIds = chats.map(c => c.original?.user?.id);
  const displayedFoundParents = foundParents.filter(p =>
      p.id !== user?.id && !existingChatUserIds.includes(p.id)
  );

  const handleCreateChat = async (userId) => {
      try {
          const newChatData = await createChat(token, userId);

          const mappedChat = {
              id: newChatData.channelId,
              name: `${newChatData.user.name} ${newChatData.user.surname}`,
              imageId: newChatData.user.imageId,
              message: newChatData.lastMessage?.textContent || (newChatData.lastMessage?.imageContent || newChatData.lastMessage?.imageId ? "Zdjęcie" : ""),
              time: newChatData.lastMessage?.createdAt ? formatToDateString(new Date(newChatData.lastMessage.createdAt)) : "",
              isOnline: false,
              original: newChatData
          };

          setChats(prev => [mappedChat, ...prev]);
          setActiveChat(mappedChat);
          setSearchTerm(""); // Optionally clear search
      } catch (err) {
          console.error("Failed to create chat:", err);
      }
  };

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
              {displayedFoundParents.length > 0 && (
                  <div style={{marginBottom: '16px'}}>
                      <h4 style={{...styles.chatTitle, fontSize: '14px', marginBottom: '8px'}}>Znalezione osoby</h4>
                      {displayedFoundParents.map((parent) => (
                          <div
                              key={parent.id}
                              style={{...styles.chatItem, flexDirection: "row", alignItems: "center", marginBottom: '12px'}}
                              onClick={() => handleCreateChat(parent.id)}
                          >
                                {parent.imageId ? (
                                    <img
                                        src={`${REACT_APP_API_BASE_URL}/image/get/${parent.imageId}`}
                                        alt={parent.name}
                                        style={styles.chatAvatar}
                                    />
                                ) : (
                                    <div style={styles.chatAvatar} />
                                )}
                              <div style={{display: 'flex', flexDirection: 'column'}}>
                                  <span style={styles.chatName}>{parent.name} {parent.surname}</span>
                              </div>
                          </div>
                      ))}
                      <div style={{borderBottom: '1px solid #eee', margin: '8px 0'}}></div>
                  </div>
              )}
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id} 
                  style={{...styles.chatItem, flexDirection: "row", alignItems: "center"}}
                  onClick={() => setActiveChat(chat)}
                >
                    {chat.imageId ? (
                        <img
                            src={`${REACT_APP_API_BASE_URL}/image/get/${chat.imageId}`}
                            alt={chat.name}
                            style={styles.chatAvatar}
                        />
                    ) : (
                        <div style={styles.chatAvatar} />
                    )}
                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '4px'}}>
                      <div style={styles.chatInfoTop}>
                        <span style={styles.chatName}>{chat.name}</span>
                        <span style={styles.chatTime}>{chat.time}</span>
                      </div>
                      <div style={styles.chatMessage}>{chat.message}</div>
                  </div>
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
  chatAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "#ddd",
    marginRight: "12px",
    flexShrink: 0,
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

