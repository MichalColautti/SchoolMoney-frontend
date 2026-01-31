import React, { useState, useContext } from "react";
import cancelIcon from "../../assets/cancel.svg";
import { changeClassBlockStatus } from "../../services/schoolClass";
import { AuthContext } from "../../contexts/AuthContext";

const ClassesTab = ({ classesData, setClassesData }) => {
  const { token } = useContext(AuthContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleOpenConfirmModal = (classInfo) => {
    setSelectedClass(classInfo);
    setIsConfirmModalOpen(true);
  };

  const handleToggleClassStatus = async () => {
    const isLocked = selectedClass.status === "Aktywna";

    try {
        await changeClassBlockStatus(selectedClass.id, isLocked, token);

        setClassesData((prev) =>
          prev.map((c) =>
            c.id === selectedClass.id
              ? { ...c, status: isLocked ? "Zablokowana" : "Aktywna" }
              : c,
          ),
        );
    } catch (error) {
        console.error("Failed to change class status:", error);
    }

    setIsConfirmModalOpen(false);
    setSelectedClass(null);
  };

  return (
    <div style={styles.mainWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Panel Administratora: Klasy</h2>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nazwa klasy</th>
              <th style={styles.th}>Rocznik</th>
              <th style={styles.th}>Zbiórki (Otwarte/Suma)</th>
              <th style={styles.th}>Uczniowie</th>
              <th style={styles.th}>Skarbnik</th>
              <th style={styles.th}>UID</th>
              <th style={styles.th}>Status</th>
              {/* Wyśrodkowany nagłówek z dopasowaną szerokością */}
              <th style={{ ...styles.th, textAlign: "center", width: "150px" }}>
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {classesData.map((c) => {
              const isActive = c.status === "Aktywna";
              return (
                <tr key={c.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{c.name}</strong>
                  </td>
                  <td style={styles.td}>{c.year}</td>
                  <td style={styles.td}>
                    <span style={styles.openCount}>{c.openCollections}</span>
                    <span style={styles.separator}>/</span>
                    <span style={styles.closedCount}>
                      {c.allCollections}
                    </span>
                  </td>
                  <td style={styles.td}>{c.studentsCount}</td>
                  <td style={styles.td}>{c.treasurerName}</td>
                  <td style={styles.td}>
                    <code style={styles.uid}>{c.uid}</code>
                  </td>
                  <td style={styles.td}>
                    <div
                      style={{
                        ...styles.badge,
                        backgroundColor: isActive ? "#63FF63" : "#FF5C5C",
                      }}
                    >
                      {c.status}
                    </div>
                  </td>
                  <td style={styles.tdAction}>
                    <button
                      onClick={() => handleOpenConfirmModal(c)}
                      style={{
                        ...styles.btnAction,
                        backgroundColor: isActive ? "#FF5C5C" : "#63FF63",
                      }}
                    >
                      {isActive ? "Zablokuj" : "Odblokuj"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL POTWIERDZENIA */}
      {isConfirmModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalWindow}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Potwierdź zmianę statusu</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setIsConfirmModalOpen(false)}
              >
                <img src={cancelIcon} alt="Zamknij" width="20" />
              </button>
            </div>
            <div style={styles.modalBody}>
              Czy na pewno chcesz{" "}
              {selectedClass.status === "Aktywna" ? "zablokować" : "odblokować"}{" "}
              klasę:
              <br />
              <strong
                style={{ fontSize: "20px", display: "block", margin: "10px 0" }}
              >
                {selectedClass.name}
              </strong>
              <span style={{ color: "#888", fontSize: "14px" }}>
                Skarbnik: {selectedClass.treasurerName}
              </span>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.confirmBtn}
                onClick={handleToggleClassStatus}
              >
                {selectedClass.status === "Aktywna"
                  ? "Zablokuj klasę"
                  : "Odblokuj klasę"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  mainWrapper: { width: "100%", boxSizing: "border-box" },
  container: {
    background: "#fff",
    borderRadius: "15px",
    padding: "30px",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  header: { marginBottom: "25px" },
  title: { fontSize: "18px", fontWeight: "600", color: "#333" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "15px",
    color: "#666",
    fontSize: "14px",
    borderBottom: "1px solid #eee",
    whiteSpace: "nowrap",
  },
  tr: { borderBottom: "1px solid #f9f9f9" },
  td: {
    padding: "18px 15px",
    fontSize: "15px",
    color: "#333",
    verticalAlign: "middle",
  },
  openCount: { color: "#2B7FFF", fontWeight: "700" },
  separator: { margin: "0 5px", color: "#ccc" },
  closedCount: { color: "#888" },
  uid: {
    background: "#F2F7FD",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
    color: "#2B7FFF",
  },
  badge: {
    display: "inline-block",
    padding: "8px 15px",
    borderRadius: "20px",
    color: "#fff",
    fontWeight: "700",
    fontSize: "12px",
    textAlign: "center",
    minWidth: "90px",
  },
  tdAction: {
    textAlign: "left", // Zmienione na center dla lepszego wyrównania pod nagłówkiem
    padding: "15px",
    width: "150px",
  },
  btnAction: {
    border: "none",
    borderRadius: "12px",
    padding: "10px 0",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "13px",
    width: "110px",
    textAlign: "center",
    margin: "0 auto", // Centrowanie wewnątrz td
    display: "block",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modalWindow: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    width: "420px",
    padding: "30px",
    textAlign: "center",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: { margin: 0, fontSize: "18px", fontWeight: "700" },
  closeBtn: { background: "none", border: "none", cursor: "pointer" },
  modalBody: { fontSize: "16px", marginBottom: "30px", color: "#444" },
  confirmBtn: {
    width: "100%",
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default ClassesTab;
