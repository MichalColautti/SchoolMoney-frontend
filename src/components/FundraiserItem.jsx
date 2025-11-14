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
  const [isExpanded, setIsExpanded] = useState(
    fundraiser.isExpandedDefault || false
  );
  const toggleExpand = () => setIsExpanded(!isExpanded);

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
  } = fundraiser;

  const isActive = badges.some(
    (b) => b.type === "green" && b.text === "Aktywna"
  );

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
            <h3 style={styles.childrenHeader}>Moje dzieci</h3>
            {children.map((child) => {
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
                  <button
                    style={isPaid ? styles.buttonRed : styles.buttonDisabled}
                    disabled={!isPaid}
                  >
                    Zwróć pieniądze
                  </button>
                </div>
              );
            })}
          </div>

          {isActive && (
            <div style={styles.footer}>
              <button style={styles.buttonBlueLarge}>Wpłać na zbiórkę</button>
            </div>
          )}
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
};

export default FundraiserItem;
