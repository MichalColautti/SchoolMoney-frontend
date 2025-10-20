import { useState } from "react";
import showPasswordIcon from "../../assets/showPasswordIcon.svg";
import hidePasswordIcon from "../../assets/hidePasswordIcon.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //handle login logic
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
  };

  return (
    console.log("Login component rendered"),
    (
      <form style={styles.container} onSubmit={handleSubmit}>
        <label style={styles.text}>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={styles.text}>Hasło</label>
        <div style={styles.passwordContainer}>
          <input
            style={styles.input}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            style={styles.showPasswordButton}
            onClick={() => setShowPassword((prev) => !showPassword)}
          >
            <img
              src={showPassword ? hidePasswordIcon : showPasswordIcon}
              style={styles.icon}
              alt={showPassword ? "ukryj" : "pokaż"}
            />
          </button>
        </div>
        <button type="submit" style={styles.submitButton}>
          Zaloguj się
        </button>
      </form>
    )
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
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  showPasswordButton: {
    position: "absolute",
    right: "12px",
    top: "57%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    padding: "0",
    cursor: "pointer",
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
  error: {
    color: "red",
    marginBottom: "10px",
  },
  icon: {
    width: "20px",
    height: "20px",
  },
};

export default Login;
