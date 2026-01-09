import React, { useState, useRef } from "react";
import ClassItem from "./ClassItem";
import cancelIcon from "../assets/cancel.svg";
import TrashcanIcon from "../assets/trashcan.svg";
import ImageFileIcon from "../assets/imageFile.svg";
import UploadFileIcon from "../assets/upload.svg";

const ClassesTab = ({ classesData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    year: "",
    photo: null,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    year: "",
    photo: "",
  });

  const fileInputRef = useRef(null);

  const placeholderChildren = [
    { id: 1, name: "Janek" },
    { id: 2, name: "Zosia" },
    { id: 3, name: "Marek" },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCreateClassModal = () => setIsCreateClassModalOpen(true);
  const handleCloseCreateClassModal = () => setIsCreateClassModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value }));
    if (value) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewClass((prev) => ({ ...prev, photo: file }));
    if (file) {
      setFormErrors((prev) => ({ ...prev, photo: "" }));
    }
  };

  const handleCreateClass = () => {
    const errors = {};
    if (!newClass.name) errors.name = "Nazwa klasy jest wymagana.";
    if (!newClass.year) errors.year = "Rocznik jest wymagany.";
    if (!newClass.photo) errors.photo = "Zdjęcie klasy jest wymagane.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log("New class data:", newClass);
    handleCloseCreateClassModal();
    setNewClass({ name: "", year: "", photo: null });
  };

  return (
    <div>
      <div style={styles.classContainer}>
        {classesData.map((classInfo) => (
          <ClassItem key={classInfo.id} classInfo={classInfo} />
        ))}
      </div>

      <div style={styles.actionButtons}>
        <button style={styles.button} onClick={handleOpenModal}>
          Dołącz do klasy
        </button>
        <button style={styles.button} onClick={handleOpenCreateClassModal}>
          Stwórz klasę
        </button>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Dołącz do klasy</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                <img src={cancelIcon} alt="Zamknij" width="24" height="24" />
              </button>
            </div>

            <p style={styles.modalSubtitle}>
              Użyj kodu dostępu otrzymanego od skarbnika
            </p>

            <div style={styles.formGroup}>
              <label style={styles.label}>Dziecko</label>
              <select
                style={styles.selectInput}
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                <option value="" disabled>
                  Wybierz dziecko
                </option>
                {placeholderChildren.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Kod dostępu</label>
              <input
                type="text"
                style={styles.textInput}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>

            <button style={{ ...styles.button, marginTop: "24px" }}>
              Dołącz do klasy
            </button>
          </div>
        </div>
      )}

      {isCreateClassModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContentLarge}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Stwórz nową klasę</h2>
              <button
                style={styles.closeButton}
                onClick={handleCloseCreateClassModal}
              >
                <img src={cancelIcon} alt="Zamknij" width="24" height="24" />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Nazwa klasy</label>
              <input
                type="text"
                name="name"
                style={styles.textInput}
                value={newClass.name}
                onChange={handleInputChange}
              />
              {formErrors.name && (
                <span style={styles.errorText}>{formErrors.name}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Rocznik</label>
              <input
                type="text"
                name="year"
                style={styles.textInput}
                value={newClass.year}
                onChange={handleInputChange}
              />
              {formErrors.year && (
                <span style={styles.errorText}>{formErrors.year}</span>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Zdjęcie klasy</label>
              <div
                style={
                  newClass.photo
                    ? styles.uploadSectionFilled
                    : styles.uploadContainer
                }
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {newClass.photo ? (
                  <div style={styles.fileRow}>
                    <img
                      src={ImageFileIcon}
                      alt="imageFile"
                      width={24}
                      height={24}
                    />
                    <span style={styles.fileName}>{newClass.photo.name}</span>
                    <button
                      style={styles.trashBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewClass((prev) => ({ ...prev, photo: null }));
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                    >
                      <img src={TrashcanIcon} alt="delete" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: "12px" }}>
                      <img
                        src={UploadFileIcon}
                        alt="UploadFile"
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
              {formErrors.photo && (
                <span style={styles.errorText}>{formErrors.photo}</span>
              )}
            </div>

            <button
              style={{ ...styles.button, marginTop: "24px" }}
              onClick={handleCreateClass}
            >
              Stwórz klasę
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  classContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "16px",
  },
  actionButtons: {
    display: "flex",
    gap: "16px",
  },
  button: {
    flex: 1,
    background: "#2B7FFF",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    padding: "16px 0",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
    width: "100%",
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
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    position: "relative",
  },
  modalContentLarge: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
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
  modalSubtitle: {
    margin: "0 0 24px 0",
    color: "#667",
    fontSize: "14px",
  },
  formGroup: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
  },
  selectInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #2B7FFF",
    backgroundColor: "#fff",
    fontSize: "14px",
    color: "#666",
    outline: "none",
  },
  textInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#F0F9FF",
    fontSize: "16px",
    height: "40px",
    outline: "none",
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#F0F9FF",
    border: "2px dashed #2B7FFF",
    borderRadius: "10px",
    padding: "32px",
    cursor: "pointer",
    minHeight: "140px",
    boxSizing: "border-box",
  },
  uploadSectionFilled: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#F2F7FD",
    border: "1px solid transparent",
    borderRadius: "10px",
    padding: "14px 16px",
    cursor: "pointer",
    boxSizing: "border-box",
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
    display: "flex",
    alignItems: "center",
    padding: 0,
    marginLeft: "auto",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default ClassesTab;