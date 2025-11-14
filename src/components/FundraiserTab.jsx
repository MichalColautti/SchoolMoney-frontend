import FundraiserItem from "./FundraiserItem";

const FundraiserTab = ({ fundraisersData }) => {
  return (
    <div style={styles.listContainer}>
      {fundraisersData.map((fundraiser) => (
        <FundraiserItem key={fundraiser.id} fundraiser={fundraiser} />
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
