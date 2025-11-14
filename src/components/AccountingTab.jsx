import AccountingItem from "./AccountingItem";

const AccountingTab = ({ accountingData }) => {
  return (
    <div style={styles.listContainer}>
      {accountingData.map((classData) => (
        <AccountingItem key={classData.id} classData={classData} />
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

export default AccountingTab;
