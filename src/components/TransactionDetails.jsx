const TransactionDetails = ({ details, fundraiserName }) => {
  const getStatusProps = (status) => {
    switch (status) {
      case "failed":
        return { text: "Nieudana", style: { color: "#DC2626" } };
      case "success":
        return { text: "Udana", style: { color: "#1A844D" } };
      default:
        return { text: "Oczekująca", style: { color: "#B45309" } };
    }
  };

  const status = getStatusProps(details.status);

  return (
    <>
      <div style={styles.detailRow}>
        <strong>Zbiórka:</strong>
        <span style={styles.fundraiserDetail}>
          <div style={styles.fundraiserIcon} /> {fundraiserName}
        </span>
      </div>
      <div style={styles.detailRow}>
        <strong>Data operacji:</strong> {details.transactionDate}
      </div>
      <div style={styles.detailRow}>
        <strong>Data księgowania:</strong> {details.bookingDate}
      </div>
      <div style={styles.detailRow}>
        <strong>Status:</strong> <span style={status.style}>{status.text}</span>
      </div>
      <div style={styles.detailRow}>
        <strong>Kwota:</strong> {details.amount}
      </div>
      <div style={styles.separator} />
      <div style={styles.detailRow}>
        <strong>Konto nadawcy:</strong> {details.sender.account}
      </div>
      <div style={styles.detailRow}>
        <strong>Dane nadawcy:</strong> {details.sender.name}
      </div>
      <div style={styles.detailRow}>
        <strong>Konto odbiorcy:</strong> {details.recipient.account}
      </div>
      <div style={styles.detailRow}>
        <strong>Metoda płatności:</strong> {details.paymentMethod}
      </div>
      <div style={styles.separator} />
      <button
        style={{
          ...styles.blueButton,
          marginLeft: "auto",
          display: "block",
        }}
      >
        Pobierz
      </button>
    </>
  );
};

const styles = {
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    fontSize: "14px",
    color: "#334155",
    flexWrap: "wrap",
  },
  fundraiserDetail: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  fundraiserIcon: {
    width: 32,
    height: 32,
    borderRadius: "16px",
    background: "#00ec18ff",
  },
  separator: {
    height: "1px",
    background: "#F3F4F6",
    margin: "12px 0",
  },
  blueButton: {
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default TransactionDetails;
