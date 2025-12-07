import { useState } from "react";
import AccountingFundraiserItem from "./AccountingFundraiserItem";

const AccountingItem = ({ classData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const { classInfo, fundraisers } = classData;

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header} onClick={toggleExpand}>
        <div style={styles.headerInfo}>
          <div style={styles.iconDiv} />
          <span style={styles.classInfo}>{classInfo.name}</span>
          <span style={styles.classInfo}>{classInfo.year}</span>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.expandArrow}>{isExpanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Fundraiser details */}
      {isExpanded && (
        <div style={styles.mainExpandedContent}>
          <div style={styles.subComponentsList}>
            {fundraisers.map((fundraiserData) => (
              <AccountingFundraiserItem
                key={fundraiserData.id}
                fundraiserData={fundraiserData}
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
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 1px 4px #e6eaf3",
  },
  header: {
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
  iconDiv: {
    width: 40,
    height: 40,
    borderRadius: "16px",
    background: "#4789dfff",
  },
  classInfo: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#1E293B",
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
};

export default AccountingItem;
