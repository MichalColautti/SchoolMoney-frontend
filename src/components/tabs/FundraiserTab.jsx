import FundraiserItem from "../items/FundraiserItem";

const FundraiserTab = ({ fundraisersData, isTreasurer }) => {
  return (
    <div style={styles.listContainer}>
      {fundraisersData.map((fundraiser) => (
        <FundraiserItem key={fundraiser.id} fundraiser={fundraiser} isTreasurer={isTreasurer} />
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

export default FundraiserTab;
