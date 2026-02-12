import { useState, useRef } from "react";
import TransactionDetails from "./../TransactionDetails";
import cancelIcon from "../../assets/cancel.svg";
import TrashcanIcon from "../../assets/trashcan.svg";
import UploadFileIcon from "../../assets/upload.svg";

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
  const [isPayoutExpanded, setIsPayoutExpanded] = useState(false);
  const togglePayoutExpand = () => setIsPayoutExpanded(!isPayoutExpanded);
  const { details } = payout;

  return (
    <div style={styles.subCard}>
      <div style={styles.subHeader} onClick={togglePayoutExpand}>
        <div style={styles.headerInfo}>
          <div style={styles.fundraiserIcon} />
          <span style={styles.text}>{fundraiserName} - Wypłata</span>
        </div>
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
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    number: "",
    date: "",
    amount: "",
    description: "",
    file: null,
  });
  const fileInputRef = useRef(null);

  const { fundraiser, documents, payouts } = fundraiserData;

  const toggleAddInvoiceModal = () => setIsAddInvoiceModalOpen(!isAddInvoiceModalOpen);

  const handleAddInvoice = () => {
    console.log("Invoice added:", invoiceData);
    toggleAddInvoiceModal();
    setInvoiceData({ number: "", date: "", amount: "", description: "", file: null });
  };

  const handleInputChange = (key, value) => {
    setInvoiceData((prev) => ({ ...prev, [key]: value }));
  };

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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={styles.blueButton} onClick={toggleAddInvoiceModal}>Dodaj fakturę</button>
          </div>
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

      {isAddInvoiceModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContentLarge}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Dodaj fakturę</h2>
              <button style={styles.closeButton} onClick={toggleAddInvoiceModal}>
                <img src={cancelIcon} alt="Zamknij" width="24" height="24" />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Numer faktury</label>
              <input
                type="text"
                style={styles.textInput}
                value={invoiceData.number}
                onChange={(e) => handleInputChange("number", e.target.value)}
                placeholder="np. FV/2023/10/01"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Data</label>
              <input
                type="date"
                style={styles.textInput}
                value={invoiceData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Kwota</label>
              <input
                type="text"
                style={styles.textInput}
                value={invoiceData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="np. 150.00 zł"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Opis</label>
              <input
                type="text"
                style={styles.textInput}
                value={invoiceData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="np. Zakup materiałów"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Skan faktury</label>
              <div
                style={invoiceData.file ? styles.uploadSectionFilled : styles.uploadContainer}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => handleInputChange("file", e.target.files[0])}
                />
                {invoiceData.file ? (
                  <div style={styles.fileRow}>
                    <span style={styles.fileName}>{invoiceData.file.name}</span>
                    <button style={styles.trashBtn} onClick={(e) => { e.stopPropagation(); handleInputChange("file", null); }}>
                      <img src={TrashcanIcon} alt="delete" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: "12px" }}><img src={UploadFileIcon} alt="Upload" width={64} height={64} /></div>
                    <span style={styles.uploadLabelBold}>Wyślij plik</span>
                  </>
                )}
              </div>
            </div>

            <button style={{ ...styles.blueButton, width: "100%", marginTop: "24px", padding: "16px", fontSize: "16px" }} onClick={handleAddInvoice}>
              Zatwierdź
            </button>
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
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContentLarge: {
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "20px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formGroup: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#000",
  },
  textInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#F0F9FF",
    fontSize: "16px",
    height: "40px",
    outline: "none",
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#F0F9FF",
    border: "2px dashed #2B7FFF",
    borderRadius: "10px",
    padding: "32px",
    cursor: "pointer",
    minHeight: "140px",
    boxSizing: "border-box",
  },
  uploadSectionFilled: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#F2F7FD",
    border: "1px solid transparent",
    borderRadius: "10px",
    padding: "14px 16px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  uploadLabelBold: {
    fontWeight: "600",
    fontSize: "15px",
    color: "#000",
  },
  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  fileName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#101828",
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  trashBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
    marginLeft: "auto",
  },
};

export default AccountingFundraiserItem;
