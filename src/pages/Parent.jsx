import Header from "../components/Header";
import Panel from "../components/Panel";
import ChildrenTable from "../components/ChildrenTable";

const kidsData = [
  {
    name: "Jan Kowalski",
    class: "3c",
    dateOfBirth: "19.20.2009",
    uid: "489gsgi3",
  },
  {
    name: "Zofia Kowalska",
    class: "1c",
    dateOfBirth: "19.20.2009",
    uid: "489g443",
  },
];

const Parent = () => {
  return (
    <>
      <Header balance={432.32} />
      <div style={styles.container}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <Panel title="Moje dzieci" value="2" />
          <Panel title="Aktywne zbiórki" value="1" />
          <Panel title="Transakcje" value="5" />
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          <span style={styles.navTabActive}>Dzieci</span>
          <span style={styles.navTab}>Klasy</span>
          <span style={styles.navTab}>Zbiórki</span>
          <span style={styles.navTab}>Transakcje</span>
          <span style={styles.navTab}>Rachunkowość</span>
        </nav>

        {/* Kids table */}
        <ChildrenTable kids={kidsData} />
      </div>
    </>
  );
};

const styles = {
  container: {
    background: "#F2F8FF",
    minHeight: "100vh",
    padding: "16px",
    fontFamily: "'Krub', sans-serif",
  },
  tableContainer: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 1px 4px #e6eaf3",
  },
  nav: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    fontWeight: "bold",
    background: "#EFF6FF",
    width: "fit-content",
    borderRadius: 8,
  },
  navTab: {
    padding: "8px 16px",
    borderRadius: 8,
    background: "transparent",
    color: "#414345",
    cursor: "pointer",
  },
  navTabActive: {
    padding: "8px 16px",
    borderRadius: 8,
    background: "#fff",
    color: "#2B7FFF",
    cursor: "pointer",
  },
};

export default Parent;
