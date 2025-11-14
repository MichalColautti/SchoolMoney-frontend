import { useState } from "react";

const getStatusProps = (status) => {
  switch (status) {
    case "failed":
      return {
        text: "Nieudana",
        style: { ...styles.statusButton, ...styles.statusFailed },
      };
    case "success":
      return {
        text: "Udany",
        style: { ...styles.statusButton, ...styles.statusSuccess },
      };
    default:
      return {
        text: "Oczekująca",
        style: { ...styles.statusButton, ...styles.statusPending },
      };
  }
};

const TransactionItem = ({ transaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const statusProps = getStatusProps(transaction.status);

  const {
    classInfo,
    fundraiser,
    transactionDate,
    bookingDate,
    amount,
    sender,
    recipient,
    paymentMethod,
  } = transaction;

  return (
    <div style={styles.transactionItem}>
      {/* Header */}
      <div style={styles.transactionHeader} onClick={toggleExpand}>
        <div style={styles.transactionInfo}>
          <div style={styles.iconDiv} />
          <span style={styles.classInfo}>
            {classInfo.name} 
          </span>
          <span style={styles.text}>{classInfo.year}</span>
          <div style={styles.fundraiserIcon} />
          <span style={styles.text}>{fundraiser.name}</span>

          {!isExpanded && (
            <>
              <span style={styles.text}>{transactionDate}</span>
              <span style={styles.amount}>{amount}</span>
            </>
          )}
        </div>

        <div style={styles.transactionActions}>
          <button style={statusProps.style}>{statusProps.text}</button>
          <div style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Transaction details */}
      {isExpanded && (
        <div style={styles.expandedContent}>
          <div style={styles.detailRow}>
            <strong>Zbiórka:</strong>
            <span style={styles.fundraiserDetail}>
              <div style={styles.fundraiserIcon} /> {fundraiser.name}
            </span>
          </div>
          <div style={styles.detailRow}>
            <strong>Data operacji:</strong> {transactionDate}
          </div>
          <div style={styles.detailRow}>
            <strong>Data księgowania:</strong> {bookingDate}
          </div>
          <div style={styles.detailRow}>
            <strong>Status:</strong>{" "}
            <span style={{ color: statusProps.style.color }}>
              {statusProps.text}
            </span>
          </div>
          <div style={styles.detailRow}>
            <strong>Kwota:</strong> {amount}
          </div>

          <div style={styles.separator} />

          <div style={styles.detailRow}>
            <strong>Konto nadawcy:</strong> {sender.account}
          </div>
          <div style={styles.detailRow}>
            <strong>Dane nadawcy:</strong> {sender.name}
          </div>
          <div style={styles.detailRow}>
            <strong>Konto odbiorcy:</strong> {recipient.account}
          </div>
          <div style={styles.detailRow}>
            <strong>Metoda płatności:</strong> {paymentMethod}
          </div>

          <div style={styles.separator} />

          <button style={styles.downloadButton}>Pobierz</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  transactionItem: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 1px 4px #e6eaf3",
  },
  transactionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  transactionInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap", 
  },
  iconDiv: {
    width: 40,
    height: 40,
    borderRadius: "16px",
    background: "#4789dfff", 
  },
  fundraiserIcon: {
    width: 32,
    height: 32,
    borderRadius: "16px",
    background: "#00ec18ff", 
  },
  classInfo: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#1E293B",
  },
  text: {
    color: "#475569",
  },
  amount: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  transactionActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  expandArrow: {
    fontSize: "20px",
    color: "#2B7FFF",
    fontWeight: "bold",
  },
  expandedContent: {
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "3px solid #F3F4F6",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    fontSize: "14px",
    color: "#334155",
  },
  fundraiserDetail: {
    display: "flex",
    alignItems: "center",
    gap: "10px", 
  },
  separator: {
    height: "1px",
    background: "#F3F4F6",
    margin: "12px 0",
  },
  downloadButton: {
    width: "fit-content",
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "auto",
    display: "block",
  },
  statusButton: {
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  statusFailed: {
    background: "#FEE2E2",
    color: "#DC2626",
  },
  statusSuccess: {
    background: "#D9F9E5",
    color: "#1A844D",
  },
  statusPending: {
    background: "#FEF3C7",
    color: "#B45309",
  },
};

export default TransactionItem;