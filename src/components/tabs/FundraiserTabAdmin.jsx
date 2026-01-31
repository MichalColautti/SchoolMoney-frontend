import React, { useState, useContext } from "react";
import cancelIcon from "../../assets/cancel.svg";
import { closeFundraising, returnFundraising } from "../../services/fundraising";
import { AuthContext } from "../../contexts/AuthContext";

const FundraiserTab = ({ fundraisersData, setFundraisersData }) => {
  const { token } = useContext(AuthContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "close" lub "return"
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);

  const handleOpenModal = (fundraiser, type) => {
    setSelectedFundraiser(fundraiser);
    setModalType(type);
    setIsConfirmModalOpen(true);
  };

  const handleAction = async () => {
    try {
      if (modalType === "close") {
        await closeFundraising(selectedFundraiser.id, token);
        setFundraisersData((prev) =>
          prev.map((f) =>
            f.id === selectedFundraiser.id ? { ...f, status: "Zakończona" } : f,
          ),
        );
      } else {
        await returnFundraising(selectedFundraiser.id, token);
        setFundraisersData((prev) =>
          prev.map((f) =>
            f.id === selectedFundraiser.id ? { ...f, status: "Zakończona", collected: 0 } : f,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to perform action on fundraiser:", error);
    }

    setIsConfirmModalOpen(false);
  };

  return (
    <div style={styles.mainWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Zarządzanie zbiórkami</h2>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nazwa</th>
              <th style={styles.th}>Klasa</th>
              <th style={styles.th}>Skarbnik</th>
              <th style={styles.th}>Cel / Zebrano</th>
              <th style={styles.th}>Utworzono</th>
              <th style={styles.th}>Zakończenie</th>
              <th style={{ ...styles.th, textAlign: "center", width: "240px" }}>
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {fundraisersData.map((f) => (
              <tr key={f.id} style={styles.tr}>
                <td style={styles.td}>
                  <strong>{f.name}</strong>
                </td>
                <td style={styles.td}>{f.className}</td>
                <td style={styles.td}>{f.treasurer}</td>
                <td style={styles.td}>
                  <span style={styles.goalText}>{f.goal} zł</span>
                  <span style={styles.separator}>/</span>
                  <span style={styles.collectedText}>{f.collected} zł</span>
                </td>
                <td style={styles.td}>{f.createdAt}</td>
                <td style={styles.td}>{f.endDate}</td>
                <td style={styles.tdAction}>
                  <div style={styles.actionGroup}>
                    <button
                      onClick={() => handleOpenModal(f, "close")}
                      disabled={f.status === "Zakończona" || f.status === "Zwrócona"}
                      style={{
                        ...styles.btnAction,
                        backgroundColor:
                          (f.status === "Zakończona" || f.status === "Zwrócona") ? "#ccc" : "#FF5C5C",
                      }}
                    >
                      Zamknij
                    </button>
                    <button
                      onClick={() => handleOpenModal(f, "return")}
                      disabled={f.collected <= 0}
                      style={{
                        ...styles.btnAction,
                        backgroundColor: f.collected > 0 ? "#2B7FFF" : "#ccc",
                      }}
                    >
                      Zwróć
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL POTWIERDZENIA */}
      {isConfirmModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalWindow}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {modalType === "close" ? "Zamknij zbiórkę" : "Zwróć środki"}
              </h3>
              <button
                style={styles.closeBtn}
                onClick={() => setIsConfirmModalOpen(false)}
              >
                <img src={cancelIcon} alt="Zamknij" width="20" />
              </button>
            </div>
            <div style={styles.modalBody}>
              Czy na pewno chcesz{" "}
              {modalType === "close" ? "zamknąć" : "zwrócić środki ze"} zbiórki:
              <br />
              <strong
                style={{ fontSize: "20px", display: "block", margin: "10px 0" }}
              >
                {selectedFundraiser.name}
              </strong>
              <span style={{ color: "#888", fontSize: "14px" }}>
                {selectedFundraiser.className}
              </span>
            </div>
            <button style={styles.confirmBtn} onClick={handleAction}>
              Potwierdź
            </button>
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
    fontSize: "14px",
    color: "#333",
    verticalAlign: "middle",
  },
  goalText: { color: "#666" },
  collectedText: { color: "#2B7FFF", fontWeight: "700" },
  separator: { margin: "0 5px", color: "#ccc" },
  tdAction: { width: "240px", padding: "15px" },
  actionGroup: { display: "flex", gap: "10px", justifyContent: "center" },
  btnAction: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 0",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "12px",
    width: "90px",
    textAlign: "center",
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
    width: "400px",
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
    cursor: "pointer",
  },
};

export default FundraiserTab;
