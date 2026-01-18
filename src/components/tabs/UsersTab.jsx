import { useState } from "react";

const UsersTab = ({ users, setUsers }) => {
  const [filter, setFilter] = useState("Wszyscy");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Stan dla Modala potwierdzenia
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Logika filtrowania ról
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
    // Aktualizujemy stan przekazany w propsach
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
        {/* Nagłówek */}
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

        {/* Tabela */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Imię i Nazwisko</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Rola</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Data utworzenia</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                  <span style={styles.roleText}>{u.role}</span>
                </td>
                <td style={styles.td}>
                  <div
                    style={{
                      ...styles.badge,
                      backgroundColor:
                        u.status === "Aktywny" ? "#63FF63" : "#FF5C5C",
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
                      backgroundColor:
                        u.status === "Aktywny" ? "#FF5C5C" : "#63FF63",
                    }}
                  >
                    {u.status === "Aktywny" ? "Zablokuj" : "Odblokuj"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL POTWIERDZENIA */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalWindow}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Potwierdź akcję</h3>
              <button
                style={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalBody}>
              Czy na pewno chcesz{" "}
              {selectedUser.status === "Aktywny" ? "zablokować" : "odblokować"}{" "}
              użytkownika
              <br />
              <strong>{selectedUser.name}</strong>?
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.confirmBtn} onClick={handleConfirmAction}>
                {selectedUser.status === "Aktywny" ? "Zablokuj" : "Odblokuj"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Style pozostają bez zmian (jak w poprzednim kroku)
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
    borderBottom: "1px solid #eee",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "15px",
    color: "#666",
    fontWeight: "500",
    borderBottom: "1px solid #f0f0f0",
  },
  tr: { borderBottom: "1px solid #f9f9f9" },
  td: { padding: "18px 15px", fontSize: "15px" },
  tdAction: { textAlign: "right", padding: "15px" },
  roleText: { color: "#666", fontStyle: "italic" },
  badge: {
    display: "inline-block",
    padding: "8px 20px",
    borderRadius: "20px",
    color: "#fff",
    fontWeight: "700",
    fontSize: "13px",
    textAlign: "center",
    minWidth: "100px",
  },
  btnAction: {
    border: "none",
    borderRadius: "15px",
    padding: "8px 25px",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    minWidth: "110px",
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
    zIndex: 1000,
  },
  modalWindow: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    width: "450px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  modalTitle: { margin: 0, fontSize: "18px", fontWeight: "700" },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#2B7FFF",
  },
  modalBody: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "30px",
    lineHeight: "1.5",
  },
  modalFooter: { width: "100%" },
  confirmBtn: {
    width: "100%",
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    padding: "15px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default UsersTab;
