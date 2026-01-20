import { useState, useEffect } from "react";

const MessageBubble = ({ text, imageId, token, time, isOwn }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imageId && token) {
      fetch(`http://localhost:4000/image/get/${imageId}`, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
             if (!response.ok) throw new Error("Failed to load image");
             return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        })
        .catch((err) => console.error("Failed to load image", err));
    }
  }, [imageId, token]);

  return (
    <div
      style={{
        ...styles.bubbleContainer,
        alignSelf: isOwn ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          ...styles.bubble,
          backgroundColor: isOwn ? "#5B85C7" : "#F3F1EB",
          color: isOwn ? "#fff" : "#000",
          borderBottomRightRadius: isOwn ? "0px" : "12px",
          borderTopLeftRadius: !isOwn ? "0px" : "12px",
        }}
      >
        {imageUrl ? (
             <img src={imageUrl} alt="Received content" style={styles.image} />
        ) : (
             text && <p style={styles.bubbleText}>{text}</p>
        )}
        <span
          style={{
            ...styles.bubbleTime,
            color: isOwn ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
          }}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

const styles = {
  bubbleContainer: {
    display: "flex",
    maxWidth: "80%",
    marginBottom: "8px",
  },
  bubble: {
    padding: "10px 14px",
    borderRadius: "12px",
    position: "relative",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    fontFamily: "'Krub', sans-serif",
    wordBreak: "break-word",  
    overflowWrap: "anywhere",  
    hyphens: "auto",
  },
  bubbleText: {
    margin: 0,
    fontSize: "14px",
  },
  image: {
      maxWidth: "200px",
      borderRadius: "8px",
      display: "block",
  },
  bubbleTime: {
    fontSize: "10px",
    display: "block",
    textAlign: "right",
    marginTop: "4px",
  },
};

export default MessageBubble;