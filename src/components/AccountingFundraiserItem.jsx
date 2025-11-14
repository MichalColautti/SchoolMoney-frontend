import { useState } from "react";
import TransactionDetails from "./TransactionDetails";

const InvoiceItem = ({ doc }) => {
  const isSettled = doc.status === "settled";
  return (
    <div style={styles.subCard}>
      <div style={styles.invoiceInfo}>
        <div style={styles.invoiceHeader}>
          <span style={styles.invoiceNumber}>{doc.number}</span>
          <span style={styles.invoiceDate}>{doc.date}</span>
          <span style={styles.invoiceAmount}>{doc.amount}</span>
        </div>
        <div style={styles.invoiceDesc}>{doc.description}</div>
      </div>
      <div style={styles.subCardActions}>
        <button
          style={isSettled ? styles.statusSettled : styles.statusUnsettled}
        >
          {isSettled ? "Rozliczona" : "Nieopłacona"}
        </button>
        <button style={styles.blueButton}>Pobierz</button>
      </div>
    </div>
  );
};

const PayoutItem = ({ payout, fundraiserName }) => {
  const [isPayoutExpanded, setIsPayoutExpanded] = useState(true);
  const togglePayoutExpand = () => setIsPayoutExpanded(!isPayoutExpanded);
  const { details } = payout;

  return (
    <div style={styles.subCard}>
      <div style={styles.subHeader} onClick={togglePayoutExpand}>
        <div style={styles.headerInfo} />
        <div style={styles.headerActions}>
          <button style={styles.statusSuccess}>Wypłacone</button>
          <div style={styles.expandArrow}>{isPayoutExpanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Transaction details */}
      {isPayoutExpanded && (
        <div style={styles.subCardExpandedContent}>
          <TransactionDetails
            details={details}
            fundraiserName={fundraiserName}
          />
        </div>
      )}
    </div>
  );
};

const AccountingFundraiserItem = ({ fundraiserData }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const { fundraiser, documents, payouts } = fundraiserData;

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.subHeader} onClick={toggleExpand}>
        <div style={styles.headerInfo}>
          <div style={styles.fundraiserIcon} />
          <span style={styles.text}>{fundraiser.name}</span>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Fundraiser details */}
      {isExpanded && (
        <div style={styles.mainExpandedContent}>
          <button
            style={{
              ...styles.blueButton,
              width: "100%",
              padding: "12px",
              fontSize: "16px",
            }}
          >
            Pobierz raport zbiórki
          </button>

          <div style={styles.subComponentsList}>
            {documents.map((doc) => (
              <InvoiceItem key={doc.id} doc={doc} />
            ))}
            {payouts.map((payout) => (
              <PayoutItem
                key={payout.id}
                payout={payout}
                fundraiserName={fundraiser.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #E0E3E7",
    borderRadius: "8px",
    padding: "16px",
    gap: "16px",
  },
  subHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  fundraiserIcon: {
    width: 32,
    height: 32,
    borderRadius: "16px",
    background: "#00ec18ff",
  },
  text: {
    color: "#1E293B",
    fontSize: "16px",
    fontWeight: "bold",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  expandArrow: {
    fontSize: "20px",
    color: "#2B7FFF",
    fontWeight: "bold",
  },
  mainExpandedContent: {
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "3px solid #F3F4F6",
  },
  subComponentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "16px",
  },
  subCard: {
    background: "#FFF",
    border: "1px solid #E0E3E7",
    borderRadius: "8px",
    padding: "16px",
    gap: "16px",
  },
  invoiceInfo: {
    flex: 1,
    minWidth: "250px",
  },
  invoiceHeader: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "4px",
  },
  invoiceNumber: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  invoiceDate: {
    fontSize: "14px",
    color: "#64748B",
  },
  invoiceAmount: {
    fontWeight: "bold",
    color: "#1E293B",
  },
  invoiceDesc: {
    fontSize: "14px",
    color: "#475569",
  },
  subCardActions: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  subCardExpandedContent: {
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "1px solid #F3F4F6",
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
  statusSuccess: {
    background: "#D9F9E5",
    color: "#1A844D",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  statusSettled: {
    background: "#D9F9E5",
    color: "#1A844D",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  statusUnsettled: {
    background: "#FEE2E2",
    color: "#DC2626",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
};

export default AccountingFundraiserItem;
