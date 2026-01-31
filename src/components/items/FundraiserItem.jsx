import { useState } from "react";

const getBadgeStyle = (type) => {
  if (type === "green") {
    return styles.badgeGreen;
  }
  if (type === "red") {
    return styles.badgeRed;
  }
  return styles.badgeBlue;
};

const FundraiserItem = ({ fundraiser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [activeTab, setActiveTab] = useState("my");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  const {
    title,
    badges,
    goal,
    imageUrl,
    description,
    endDate,
    costPerChild,
    organizer,
    children = [],
    otherChildren = [],
  } = fundraiser;

  const isActive = badges.some(
    (b) => b.type === "green" && b.text === "Aktywna"
  );

  const handleOpenPaymentModal = (child) => {
    setSelectedChild(child);
    setPaymentAmount(1);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = () => {
    // Tutaj logika wysłania płatności
    setIsPaymentModalOpen(false);
    setSelectedChild(null);
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header} onClick={toggleExpand}>
        <div style={styles.headerInfo}>
          <div style={styles.iconDiv} />
          <span style={styles.title}>{title}</span>
        </div>
        <div style={styles.headerActions}>
          {badges.map((badge) => (
            <span key={badge.text} style={getBadgeStyle(badge.type)}>
              {badge.text}
            </span>
          ))}
          <div style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Fundraiser details */}
      {isExpanded && (
        <div style={styles.body}>
          <p style={styles.goal}>{goal}</p>
          {imageUrl && <img src={imageUrl} alt={title} style={styles.image} />}
          {description && (
            <p style={styles.description}>
              {description.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )}

          <div style={styles.details}>
            <span>
              Planowane zakończenie zbiórki: <strong>{endDate}</strong>
            </span>
            <span>
              Koszt: <strong>{costPerChild} zł</strong>
            </span>
            <span>
              Skarbnik: <strong>{organizer}</strong>
            </span>
          </div>

          <div style={styles.childrenSection}>
            <div style={styles.tabsContainer}>
              <button
                style={activeTab === "my" ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab("my")}
              >
                Moje dzieci
              </button>
              <button
                style={activeTab === "other" ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab("other")}
              >
                Inne dzieci
              </button>
            </div>

            {activeTab === "my" && children.map((child) => {
              const isPaid = child.amountPaid >= costPerChild;
              return (
                <div key={child.id} style={styles.childItem}>
                  <div style={styles.childInfo}>
                    <div style={styles.avatar} />
                    <span>{child.name}</span>
                    <span style={styles.childAmount}>
                      {child.amountPaid} / {costPerChild} zł
                    </span>
                  </div>
                  {isPaid ? (
                    isActive ? (
                      <button style={styles.buttonRed}>Zwróć pieniądze</button>
                    ) : (
                      <span style={{ color: "#1A844D", fontWeight: "bold", fontSize: "14px", padding: "10px 24px" }}>Opłacono</span>
                    )
                  ) : (
                    isActive && (
                      <button style={styles.buttonBlueSmall} onClick={() => handleOpenPaymentModal(child)}>Wpłać</button>
                    )
                  )}
                </div>
              );
            })}

            {activeTab === "other" && otherChildren.map((child) => {
              const isPaid = child.amountPaid >= costPerChild;
              return (
                <div key={child.id} style={styles.childItem}>
                  <div style={styles.childInfo}>
                    <div style={styles.avatar} />
                    <span>{child.name}</span>
                    <span style={styles.childAmount}>
                      {child.amountPaid} / {costPerChild} zł
                    </span>
                  </div>
                  {isPaid ? (
                    <span style={{ color: "#1A844D", fontWeight: "bold", fontSize: "14px", padding: "10px 24px" }}>Opłacono</span>
                  ) : (
                    isActive && (
                      <button style={styles.buttonBlueSmall} onClick={() => handleOpenPaymentModal(child)}>Wpłać</button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isPaymentModalOpen && selectedChild && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Wpłać dla: {selectedChild.name}</h3>
            <p style={{ marginBottom: "16px", color: "#64748B" }}>
              Brakuje: <strong>{costPerChild - selectedChild.amountPaid} zł</strong>
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <input
                type="range"
                min="1"
                max={costPerChild - selectedChild.amountPaid}
                value={paymentAmount || 1}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                style={styles.rangeInput}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="number"
                  min="1"
                  max={costPerChild - selectedChild.amountPaid}
                  value={paymentAmount}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (val === "") {
                      setPaymentAmount("");
                      return;
                    }
                    val = Number(val);
                    const max = costPerChild - selectedChild.amountPaid;
                    if (val > max) val = max;
                    setPaymentAmount(val);
                  }}
                  onBlur={() => {
                    if (!paymentAmount || paymentAmount < 1) setPaymentAmount(1);
                  }}
                  style={styles.numberInput}
                />
                <span style={{ fontWeight: "bold", marginLeft: "8px" }}>zł</span>
              </div>
            </div>

            <div style={styles.modalActions}>
              <button style={styles.buttonBlueLarge} onClick={handlePaymentSubmit}>
                Zatwierdź
              </button>
              <button style={styles.buttonCancel} onClick={() => setIsPaymentModalOpen(false)}>
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 1px 4px #e6eaf3",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    flexWrap: "wrap",
    gap: "10px",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconDiv: {
    width: 40,
    height: 40,
    borderRadius: "16px",
    background: "#4789dfff",
  },
  title: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#1E293B",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  badgeBlue: {
    background: "#EFF6FF",
    color: "#2B7FFF",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  badgeGreen: {
    background: "#D9F9E5",
    color: "#1A844D",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  badgeRed: {
    background: "#FEE2E2",
    color: "#DC2626",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  expandArrow: {
    fontSize: "20px",
    color: "#2B7FFF",
    fontWeight: "bold",
  },
  body: {
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "3px solid #F3F4F6",
  },
  goal: {
    fontSize: "16px",
    color: "#334155",
    lineHeight: 1.5,
    margin: "0 0 16px 0",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    maxHeight: "300px",
    objectFit: "cover",
    marginBottom: "16px",
  },
  description: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    margin: "0 0 16px 0",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    background: "#F8FAFC",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  childrenSection: {
    marginTop: "24px",
  },
  childrenHeader: {
    fontSize: "16px",
    color: "#1E293B",
    marginBottom: "12px",
  },
  childItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #F3F4F6",
    flexWrap: "wrap",
    gap: "10px",
  },
  childInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  childAmount: {
    fontSize: "14px",
    color: "#64748B",
    fontWeight: "bold",
  },
  buttonRed: {
    background: "#FEE2E2",
    color: "#DC2626",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  },
  buttonDisabled: {
    background: "#F1F5F9",
    color: "#94A3B8",
    border: "none",
    borderRadius: "8px",
    padding: "10px 24px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "not-allowed",
  },
  footer: {
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #F3F4F6",
  },
  buttonBlueLarge: {
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "16px",
    background: "#4789dfff",
  },
  tabsContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    borderBottom: "1px solid #E2E8F0",
  },
  tab: {
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderBottom: "2px solid transparent",
    color: "#64748B",
    fontWeight: "600",
    background: "none",
    fontSize: "14px",
  },
  tabActive: {
    padding: "8px 16px",
    cursor: "pointer",
    border: "none",
    borderBottom: "2px solid #2B7FFF",
    color: "#2B7FFF",
    fontWeight: "600",
    background: "none",
    fontSize: "14px",
  },
  buttonBlueSmall: {
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
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
  modalContent: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  modalTitle: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1E293B",
  },
  rangeInput: {
    width: "100%",
    margin: "16px 0",
    cursor: "pointer",
  },
  numberInput: {
    width: "70px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "16px",
    outline: "none",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  buttonCancel: {
    background: "#F1F5F9",
    color: "#64748B",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
};

export default FundraiserItem;
