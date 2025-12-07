import { useState } from "react";
import TransactionDetails from "./TransactionDetails"; 

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

  const { classInfo, fundraiser, transactionDate, amount } = transaction;

  return (
    <div style={styles.transactionItem}>
      <div style={styles.transactionHeader} onClick={toggleExpand}>
        <div style={styles.transactionInfo}>
          <div style={styles.iconDiv} />
          <span style={styles.classInfo}>
            {classInfo.name} {classInfo.year}
          </span>
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

      {isExpanded && (
        <div style={styles.expandedContent}>
          <TransactionDetails
            details={transaction}
            fundraiserName={transaction.fundraiser.name}
          />
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