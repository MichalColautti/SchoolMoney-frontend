import MessageBubble from "./messageBubble";
import BackIcon from "../../assets/back.svg";
import AddIcon from "../../assets/add.svg";
import ForwardIcon from "../../assets/forward.svg";

const ChatDetail = ({ chat, onBack }) => {
  const messages = [
    { id: 1, text: "Hej gdzie jesteś?", time: "11:40", isOwn: false },
    { id: 2, text: "Hej jestem na miejscu.", time: "11:43", isOwn: true },
    { id: 3, text: "Ok też jestem.", time: "11:45", isOwn: false },
    { id: 4, text: "Gdzie? Nie mogę cię znaleźć", time: "11:46", isOwn: true },
  ];

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
            time={msg.time}
            isOwn={msg.isOwn}
          />
        ))}
      </div>

      {/* Input bar */}
      <div style={styles.inputBar}>
        <button style={styles.iconButton}>
          <img src={AddIcon} alt="add" width="24" height="24" />
        </button>
        <div style={styles.inputWrapper}>
          <input type="text" style={styles.messageInput} />
        </div>
        <button style={styles.iconButton}>
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
