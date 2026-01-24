import { useState, useEffect, useContext, useRef } from "react";
import MessageBubble from "./messageBubble";
import BackIcon from "../../assets/back.svg";
import AddIcon from "../../assets/add.svg";
import ForwardIcon from "../../assets/forward.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { getChatMessages, uploadImage } from "../../services/chat";
import { useFormatDate } from '../../hooks/useFormatDate'

const ChatDetail = ({ chat, stompClient, onBack }) => {
  const { token, user } = useContext(AuthContext);
  const { formatToDateString } = useFormatDate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const mapMessage = (m, myId) => ({
    id: m.id,
    text: m.textContent,
    imageId: m.imageId,
    time: m.createdAt ? formatToDateString(new Date(m.createdAt)) : "",
    originalDate: m.createdAt,
    isOwn: m.authorId === myId
  });

  useEffect(() => {
    if (token && chat.id) {
        getChatMessages(token, chat.id)
            .then(data => {
                const mapped = data.map(m => mapMessage(m, user?.id));
                const sorted = mapped.sort((a, b) => new Date(a.originalDate) - new Date(b.originalDate));
                setMessages(sorted);
                setTimeout(scrollToBottom, 100);
            })
            .catch(console.error);
    }
  }, [token, chat.id, user, formatToDateString]);

  useEffect(() => {
      if (!stompClient || !stompClient.connected) return;

      const subscription = stompClient.subscribe(`/user/queue/messages`, (message) => {
          if (message.body) {
              const apiMsg = JSON.parse(message.body);
              const uiMsg = mapMessage(apiMsg, user?.id);

              if (apiMsg.chatId === chat.id) {
                 setMessages(prev => {
                     if (prev.some(p => p.id === uiMsg.id)) return prev;
                     return [...prev, uiMsg];
                 });
                 setTimeout(scrollToBottom, 100);
              }
          }
      });

    return () => {
        subscription.unsubscribe();
    };
  }, [chat.id, stompClient, user]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // Reset input immediately to allow re-selection
    if (file && stompClient) {
        try {
            const uploadedImage = await uploadImage(token, file);

            const payload = {
                chatId: chat.id,
                contentType: "IMAGE",
                textContent: null,
                imageId: uploadedImage.id,
                createdAt: new Date().toISOString()
            };

            stompClient.publish({
                destination: "/app/chat.send",
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error("Error uploading image", error);
        }
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || !stompClient) return;

    const payload = {
        chatId: chat.id,
        contentType: "TEXT",
        textContent: inputText,
        imageId: null,
        createdAt: new Date().toISOString()
    };

    stompClient.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload)
    });
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={styles.chatDetailContainer}>
      {/* Header */}
      <div style={styles.detailHeader}>
        <button onClick={onBack} style={styles.backButton}>
          <img src={BackIcon} alt="back" width="24" height="24" />
        </button>

        <div style={styles.avatarSmall} />
        <span style={styles.detailName}>{chat.name}</span>
      </div>

      {/* Messages */}
      <div style={styles.messagesArea}>
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            imageId={msg.imageId}
            token={token}
            time={msg.time}
            isOwn={msg.isOwn}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div style={styles.inputBar}>
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
            accept="image/*"
        />
        <button style={styles.iconButton} onClick={() => fileInputRef.current?.click()}>
          <img src={AddIcon} alt="add" width="24" height="24" />
        </button>
        <div style={styles.inputWrapper}>
          <input
            type="text"
            style={styles.messageInput}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button style={styles.iconButton} onClick={handleSend}>
          <img src={ForwardIcon} alt="send" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatDetailContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    fontFamily: "'Krub', sans-serif",
    zIndex: 10,
  },
  detailHeader: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid #f0f0f0",
    gap: "12px",
  },
  backButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
  },
  avatarSmall: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#2B7FFF",
  },
  detailName: {
    flex: 1,
    fontSize: "16px",
    fontWeight: "700",
    color: "#333",
  },
  phoneButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  messagesArea: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  inputBar: {
    padding: "12px 10px",
    borderTop: "1px solid #f0f0f0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#A7A7A7",
    borderRadius: "20px",
    padding: "8px 12px",
  },
  messageInput: {
    width: "100%",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'Krub', sans-serif",
  },
};

export default ChatDetail;
