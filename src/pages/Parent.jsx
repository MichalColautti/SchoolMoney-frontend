import Header from "../components/Header";
import Panel from "../components/Panel";
import ChildrenTab from "../components/ChildrenTab";
import ClassesTab from "../components/ClassesTab";
import { useState } from "react";

const classesData = [
  {
    id: "c1",
    name: "Klasa 4C",
    year: "2024/2025",
    accessCode: "qwem,qwemqw,eqmw,ewqqweqnjweqwk",
    fundraisers: [
      {
        id: "f1",
        name: "Wyjazd w góry",
        userPaymentStatus: "paid", 
        fundraiserStatus: "unactive", 
      },
    ],
    students: [
      { id: "s1", name: "Jan Kowalski" },
      { id: "s2", name: "Jan Kowalski" },
      { id: "s3", name: "Jan Kowalski" },
      { id: "s4", name: "Jan Kowalski" },
      { id: "s5", name: "Jan Kowalski" },
      { id: "s6", name: "Jan Kowalski" },
      { id: "s7", name: "Jan Kowalski" },
      { id: "s8", name: "Jan Kowalski" },
    ],
  },
  {
    id: "c2",
    name: "Klasa 1A",
    year: "2023/2024",
    accessCode: "asdasdmksaaksdasmd",
    fundraisers: [
      {
        id: "f2",
        name: "Wyjście do kina",
        userPaymentStatus: "unpaid",
        fundraiserStatus: "active",
      },
    ],
    students: [
      { id: "s9", name: "Zofia Nowak" },
      { id: "s10", name: "Maciej Kowalski" },
    ],
  },
];

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
  const [activeTab, setActiveTab] = useState("children");

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
          <span style={activeTab === "children" ? styles.navTabActive : styles.navTab} onClick={() => setActiveTab("children")}>Dzieci</span>
          <span style={activeTab === "classes" ? styles.navTabActive : styles.navTab} onClick={() => setActiveTab("classes")}>Klasy</span>
          <span style={activeTab === "fundraisers" ? styles.navTabActive : styles.navTab} onClick={() => setActiveTab("fundraisers")}>Zbiórki</span>
          <span style={activeTab === "transactions" ? styles.navTabActive : styles.navTab} onClick={() => setActiveTab("transactions")}>Transakcje</span>
          <span style={activeTab === "accountancy" ? styles.navTabActive : styles.navTab} onClick={() => setActiveTab("accountancy")}>Rachunkowość</span>
        </nav>


        {/* Tabs content*/}
        {activeTab === "children" && <ChildrenTab kids={kidsData} />}
        {activeTab === "classes" && <ClassesTab classesData={classesData}/>}

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
