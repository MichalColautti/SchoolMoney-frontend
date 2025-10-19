import { useState } from "react";

const Reset = () => {
  const [email, setEmail] = useState("");

  //handle register logic
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <label style={styles.text}>Email</label>
      <input
        style={styles.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <button type="submit" style={styles.submitButton}>
        Wyślij link resetujący
      </button>
    </form>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Krub', sans-serif",
  },
  text: {
    fontSize: "16px",
    marginLeft: "2px",
    marginTop: "12px",
    textAlign: "left",
  },
  input: {
    border: "none",
    background: "#f0f9ff",
    borderRadius: "8px",
    padding: "10px",
    margin: "2px 0 0 0",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  },
  submitButton: {
    background: "#2B7FFF",
    color: "#fff",
    borderRadius: "20px",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Reset;
