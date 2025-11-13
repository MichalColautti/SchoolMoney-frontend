const ChildrenTab = ({ kids }) => (
  <div>
    <div style={styles.container}>
      <table style={styles.tableConatiner}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th></th>
            <th>Imię Nazwisko</th>
            <th>Klasa</th>
            <th>Data urodzenia</th>
            <th>UID</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {kids.map((child) => (
            <tr key={child.uid} style={{ height: 48 }}>
              <td>
                <div style={styles.avatar} />
              </td>
              <td>{child.name}</td>
              <td>{child.class}</td>
              <td>{child.dateOfBirth}</td>
              <td>{child.uid}</td>
              <td>
                <span style={{ cursor: "pointer", marginRight: 8 }}>
                  edytuj
                </span>
                <span style={{ cursor: "pointer" }}>usuń</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Action buttons */}
    <div style={styles.actionButtons}>
      <button style={styles.button}>Dodaj nowe dziecko</button>
      <button style={styles.button}>Dodaj istniejące dziecko</button>
    </div>
  </div>
);

const styles = {
  container: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 1px 4px #e6eaf3",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#2b7fff",
  },
  tableConatiner: {
    width: "100%",
    borderCollapse: "collapse",
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
  },
};

export default ChildrenTab;
