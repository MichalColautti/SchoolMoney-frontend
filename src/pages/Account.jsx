import { useState, useRef } from "react";
import Header from "../components/Header";
import TrashcanIcon from "../assets/trashcan.svg";
import UploadFileIcon from "../assets/upload.svg";
import ImageFileIcon from "../assets/imageFile.svg";

const Account = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    photo: null,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setUserData((prev) => ({ ...prev, photo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={styles.pageContainer}>
      <Header balance={432.32} />

      <div style={styles.contentWrapper}>
        <div style={styles.card}>
          {/* Nav */}
          <div style={styles.tabsContainer}>
            <button
              style={
                activeTab === "personal" ? styles.tabActive : styles.tabInactive
              }
              onClick={() => setActiveTab("personal")}
            >
              Dane osobowe
            </button>
            <button
              style={
                activeTab === "password" ? styles.tabActive : styles.tabInactive
              }
              onClick={() => setActiveTab("password")}
            >
              Zmiana hasła
            </button>
          </div>

          {/* Personal data */}
          {activeTab === "personal" && (
            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Imię</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nazwisko</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Data urodzenia</label>
                <input
                  type="text"
                  name="dob"
                  value={userData.dob}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Zdjęcie profilowe</label>

                <div
                  style={
                    userData.photo
                      ? styles.uploadSectionFilled
                      : styles.uploadContainer
                  }
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {userData.photo ? (
                    <div style={styles.fileRow}>
                      <img
                        src={ImageFileIcon}
                        alt="File"
                        width={24}
                        height={24}
                      />
                      <span style={styles.fileName}>{userData.photo.name}</span>
                      <button
                        onClick={handleRemoveFile}
                        style={styles.trashBtn}
                      >
                        <img
                          src={TrashcanIcon}
                          alt="Delete"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ marginBottom: "12px" }}>
                        <img
                          src={UploadFileIcon}
                          alt="Upload"
                          width={64}
                          height={64}
                        />
                      </div>
                      <span style={styles.uploadLabelBold}>
                        Wyślij zdjęcie profilowe
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button style={styles.saveButton}>Zapisz zmiany</button>
            </div>
          )}

          {/* Change password */}
          {activeTab === "password" && (
            <div style={styles.formContainer}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Obecne hasło</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Nowe hasło</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Potwierdź nowe hasło</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  style={styles.input}
                />
              </div>

              <button style={styles.saveButton}>Zapisz zmiany</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#F5F7FA",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Krub', sans-serif",
  },
  contentWrapper: {
    padding: "24px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "800px",
    padding: "32px",
    boxSizing: "border-box",
  },
  tabsContainer: {
    display: "flex",
    gap: "24px",
    marginBottom: "32px",
  },
  tabActive: {
    flex: 1,
    padding: "14px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#2B7FFF",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
  },
  tabInactive: {
    flex: 1,
    padding: "14px",
    borderRadius: "25px",
    border: "1px solid #E4E7EC",
    backgroundColor: "#fff",
    color: "#667085",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "center",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#101828",
  },
  input: {
    backgroundColor: "#F0F9FF",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    fontSize: "16px",
    color: "#344054",
    outline: "none",
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F9FF",
    border: "2px dashed #2B7FFF",
    borderRadius: "12px",
    padding: "32px",
    cursor: "pointer",
    minHeight: "140px",
    boxSizing: "border-box",
  },
  uploadSectionFilled: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F2F7FD",
    border: "1px solid transparent",
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    boxSizing: "border-box",
    minHeight: "60px",
  },
  uploadLabelBold: {
    fontWeight: "600",
    fontSize: "15px",
    color: "#000",
  },
  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
  },
  fileName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#101828",
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  trashBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "8px",
  },
};

export default Account;
