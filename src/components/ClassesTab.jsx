import React, { useState } from "react";
import ClassItem from "./ClassItem";
import cancelIcon from "../assets/cancel.svg";

const ClassesTab = ({ classesData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const placeholderChildren = [
    { id: 1, name: "Janek" },
    { id: 2, name: "Zosia" },
    { id: 3, name: "Marek" }
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
        <button style={styles.button}>Stwórz klasę</button>
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
                <option value="" disabled>Wybierz dziecko</option>
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

            <button style={{...styles.button, marginTop: '24px'}}>
              Dołącz do klasy
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
  }
};

export default ClassesTab;