import { useState, useContext, useEffect } from "react";
import { getImageUrl } from "../../services/image";
import { returnPayment } from "../../services/treasurer";
import { AuthContext } from "../../contexts/AuthContext";
import { useUserData } from '../../contexts/UserDataContext'

const getBadgeStyle = (type, styles) => {
  if (type === "green") return styles.badgeGreen;
  if (type === "red") return styles.badgeRed;
  return styles.badgeBlue;
};

const FundraiserItemTreasurer = ({ fundraiser, onEdit }) => {
  const { token } = useContext(AuthContext);
  const { changeUserMoney } = useUserData()
  // fundraiser.isExpandedDefault pozwala na otwarcie karty na starcie (jak w Twoim obiekcie)
  const [isExpanded, setIsExpanded] = useState(
    fundraiser.isExpandedDefault || false,
  );

  if (!fundraiser) return null;

  const {
    id,
    name,
    badges = [],
    goal,
    imageId,
    description,
    endDate,
    amount,
    organizer,
    children: propChildren = [],
  } = fundraiser;

  const [childrenList, setChildrenList] = useState(propChildren);

  useEffect(() => {
    setChildrenList(propChildren);
  }, [propChildren]);

  const handleReturnPayment = async (childId) => {
    if (!window.confirm("Czy na pewno chcesz zwrócić pieniądze?")) return;
    try {
      const money = await returnPayment(id, childId, token);
      changeUserMoney(money);
      alert("Pieniądze zostały zwrócone");
      setChildrenList((prev) =>
        prev.map((child) =>
          child.id === childId ? { ...child, amountPaid: 0 } : child
        )
      );
    } catch (e) {
      console.error(e);
      alert("Wystąpił błąd podczas zwrotu środków");
    }
  };

  console.log(`IMG: ${imageId}`);

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div style={styles.headerInfo}>
          <img style={styles.iconDiv} src={`${getImageUrl(imageId)}`} alt={"icon"}/>
          <span style={styles.title}>{name}</span>
        </div>

        <div style={styles.headerActions}>
          {/* PRZYCISK EDYTUJ - Wkomponowany w Twój styl nagłówka */}
          <button
            style={styles.editBtn}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(fundraiser);
            }}
          >
            Edytuj
          </button>

          {badges.map((badge, idx) => (
            <span key={idx} style={getBadgeStyle(badge.type, styles)}>
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

          {imageId && <img src={imageId} alt={name} style={styles.image} />}

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
              Koszt: <strong>{amount} zł</strong>
            </span>
          </div>

          {/* Sekcja dzieci */}
          <div style={styles.childrenSection}>
            <h3 style={styles.childrenHeader}>Dzieci</h3>
            {childrenList.map((child) => {
              const isPaid = child.amountPaid > 0;
              return (
                <div key={child.id} style={styles.childItem}>
                  <div style={styles.childInfo}>
                    <img
                      src={getImageUrl(child.imageId)}
                      alt={child.name}
                      style={styles.avatar}
                    />
                    <span>{child.name}</span>
                    <span style={styles.childAmount}>
                      {child.amountPaid} / {amount} zł
                    </span>
                  </div>
                  <button
                    style={isPaid ? styles.buttonRed : styles.buttonDisabled}
                    disabled={!isPaid}
                    onClick={() => handleReturnPayment(child.id)}
                  >
                    Zwróć pieniądze
                  </button>
                </div>
              );
            })}
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
    marginBottom: "16px", // Dodane dla odstępu między kartami
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
  // Styl przycisku edycji pasujący do reszty
  editBtn: {
    background: "transparent",
    border: "1.5px solid #2B7FFF",
    color: "#2B7FFF",
    borderRadius: "8px",
    padding: "6px 14px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
  },
  badgeBlue: {
    background: "#EFF6FF",
    color: "#2B7FFF",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  badgeGreen: {
    background: "#D9F9E5",
    color: "#1A844D",
    borderRadius: "8px",
    padding: "8px 16px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  badgeRed: {
    background: "#FEE2E2",
    color: "#DC2626",
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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "16px",
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
};

export default FundraiserItemTreasurer;
