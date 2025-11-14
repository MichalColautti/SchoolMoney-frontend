import TransactionItem from "./TransactionItem"; 

const TransactionsTab = ({ transactionsData }) => {
  return (
    <div style={styles.listContainer}>
      {transactionsData.map((transaction) => (
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