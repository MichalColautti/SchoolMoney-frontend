import { useEffect, useState, useContext } from "react";
import TransactionItem from "../items/TransactionItem";
import { getTransactions } from "../../services/parent";
import { AuthContext } from "../../contexts/AuthContext";

const TransactionsTab = () => {
  const [list, setList] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(token);
        if (data && Array.isArray(data)) {
           const mappedCallback = (t) => ({
             id: t.id,
             status: t.status ? t.status.toLowerCase() : "pending",
             contributorName: t.contributorName || "Nieznany",
             childName: t.childName || t.child?.name || "Nieznany",
             amount: `${t.amount} PLN`,
             fundraisingName: t.fundraising.name || "Zbiórka",
             timestamp: t.timestamp ? new Date(t.timestamp).toLocaleDateString("pl-PL") : "",
             className: t.fundraising.className
           });
           setList(data.map(mappedCallback));
        }
      } catch (e) {
        console.error("Failed to fetch transactions", e);
      }
    };

    if (token) fetchTransactions();
  }, [token]);

  return (
    <div style={styles.listContainer}>
      {list.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};

export default TransactionsTab;
