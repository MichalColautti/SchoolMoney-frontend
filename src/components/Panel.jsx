const PanelTile = ({ title, value }) => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    flex: 1,
    minWidth: 220,
    boxShadow: "0 1px 4px #e6eaf3",
  },
  title: {
    fontSize: 16,
    color: "#414345",
    marginBottom: 12,
  },
  value: {
    marginTop: 70,
    fontSize: 24,
    fontWeight: "bold",
    color: "#2B7FFF",
  },
};

export default PanelTile;
