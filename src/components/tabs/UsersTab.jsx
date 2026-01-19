import React, { useState } from "react";
import cancelIcon from "../../assets/cancel.svg";

const UsersTab = ({ users, setUsers }) => {
  const [filter, setFilter] = useState("Wszyscy");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((u) => {
    if (filter === "Wszyscy") return true;
    if (filter === "Skarbnicy") return u.role === "Skarbnik";
    if (filter === "Admini") return u.role === "Admin";
    if (filter === "Rodzice") return u.role === "Rodzic";
    return true;
  });

  const openConfirmModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, status: u.status === "Aktywny" ? "Zablokowany" : "Aktywny" }
          : u,
      ),
    );
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div style={styles.mainWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Zarządzanie użytkownikami</h2>
          <div style={styles.dropdownWrapper}>
            <div
              style={styles.select}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {filter}{" "}
              <span style={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
            </div>
            {isDropdownOpen && (
              <div style={styles.menu}>
                {["Wszyscy", "Skarbnicy", "Admini", "Rodzice"].map((opt) => (
                  <div
                    key={opt}
                    style={styles.menuItem}
                    onClick={() => {
                      setFilter(opt);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Imię i Nazwisko</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rola</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Data utworzenia</th>
              {/* Stała szerokość dla kolumny Akcje tak jak w innych tabach */}
              <th style={{ ...styles.th, textAlign: "center", width: "150px" }}>
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const isActive = u.status === "Aktywny";
              return (
                <tr key={u.id} style={styles.tr}>
                  <td style={styles.td}>
                    <strong>{u.name}</strong>
                  </td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    <span style={styles.roleText}>{u.role}</span>
                  </td>
                  <td style={styles.td}>
                    <div
                      style={{
                        ...styles.badge,
                        backgroundColor: isActive ? "#63FF63" : "#FF5C5C",
                      }}
                    >
                      {u.status}
                    </div>
                  </td>
                  <td style={styles.td}>{u.createdAt}</td>
                  <td style={styles.tdAction}>
                    <button
                      onClick={() => openConfirmModal(u)}
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
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalWindow}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Potwierdź zmianę statusu</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                <img src={cancelIcon} alt="Zamknij" width="20" />
              </button>
            </div>
            <div style={styles.modalBody}>
              Czy na pewno chcesz{" "}
              {selectedUser.status === "Aktywny" ? "zablokować" : "odblokować"}{" "}
              użytkownika:
              <br />
              <strong
                style={{ fontSize: "20px", display: "block", margin: "10px 0" }}
              >
                {selectedUser.name}
              </strong>
              <span style={{ color: "#888", fontSize: "14px" }}>
                {selectedUser.email}
              </span>
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.confirmBtn} onClick={handleConfirmAction}>
                {selectedUser.status === "Aktywny"
                  ? "Zablokuj użytkownika"
                  : "Odblokuj użytkownika"}
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: { fontSize: "18px", fontWeight: "600", margin: 0, color: "#333" },
  dropdownWrapper: { position: "relative", width: "180px" },
  select: {
    border: "1px solid #C4D7F5",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    background: "#fff",
    color: "#666",
  },
  arrow: { fontSize: "10px", color: "#2B7FFF" },
  menu: {
    position: "absolute",
    top: "110%",
    width: "100%",
    background: "#fff",
    border: "1px solid #C4D7F5",
    borderRadius: "8px",
    zIndex: 10,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  menuItem: {
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #eee",
    color: "#444",
  },
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
  roleText: { color: "#666", fontStyle: "italic", fontSize: "14px" },
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
    textAlign: "center",
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
    display: "block",
    margin: "0 auto",
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

export default UsersTab;
