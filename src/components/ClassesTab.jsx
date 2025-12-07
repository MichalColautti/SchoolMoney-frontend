import ClassItem from "./ClassItem"; 

const ClassesTab = ({ classesData }) => {
  return (
    <div>
      {/* Class container */}
      <div style={styles.classContainer}>
        {classesData.map((classInfo) => (
          <ClassItem key={classInfo.id} classInfo={classInfo} />
        ))}
      </div>

      {/* Action buttons */}
      <div style={styles.actionButtons}>
        <button style={styles.button}>Dołącz do klasy</button>
        <button style={styles.button}>Stwórz klasę</button>
      </div>
    </div>
  );
};

const styles = {
  classContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px", 
    marginBottom: "16px", 
  },
  actionButtons: {
    display: "flex",
    gap: "16px",
  },
  button: {
    flex: 1,
    background: "#2B7FFF",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    padding: "16px 0",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
};

export default ClassesTab;