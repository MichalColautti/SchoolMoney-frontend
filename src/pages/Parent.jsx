import Header from "../components/Header";
import Panel from "../components/Panel";
import ChildrenTab from "../components/tabs/ChildrenTab";
import ClassesTab from "../components/tabs/ClassesTab";
import TransactionTab from "../components/tabs/TransactionTab";
import AccountingTab from "../components/tabs/AccountingTab";
import FundraiserTab from "../components/tabs/FundraiserTab";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getParentStatus } from "../services/parent";

const Parent = () => {
  const [activeTab, setActiveTab] = useState("children");
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    numberOfChildren: 0,
    numberOfFundraisings: 0,
    numberOfTransactions: 0
  });

  useEffect(() => {
     if (token) {
         getParentStatus(token)
             .then(data => {
                 if(data) setStats(data);
             })
             .catch(console.error);
     }
  }, [token]);

  return (
    <>
      <Header balance={432.32} />
      <div style={styles.container}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <Panel
              title="Moje dzieci"
              value={stats.numberOfChildren}
          />
          <Panel
              title="Aktywne zbiórki"
              value={stats.numberOfFundraisings}
          />
          <Panel
              title="Transakcje"
              value={stats.numberOfTransactions}
          />
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          <span
            style={
              activeTab === "children" ? styles.navTabActive : styles.navTab
            }
            onClick={() => setActiveTab("children")}
          >
            Dzieci
          </span>
          <span
            style={
              activeTab === "classes" ? styles.navTabActive : styles.navTab
            }
            onClick={() => setActiveTab("classes")}
          >
            Klasy
          </span>
          <span
            style={
              activeTab === "fundraisers" ? styles.navTabActive : styles.navTab
            }
            onClick={() => setActiveTab("fundraisers")}
          >
            Zbiórki
          </span>
          <span
            style={
              activeTab === "transactions" ? styles.navTabActive : styles.navTab
            }
            onClick={() => setActiveTab("transactions")}
          >
            Transakcje
          </span>
          <span
            style={
              activeTab === "accountancy" ? styles.navTabActive : styles.navTab
            }
            onClick={() => setActiveTab("accountancy")}
          >
            Rachunkowość
          </span>
        </nav>

        {/* Tabs content*/}
        {activeTab === "children" && <ChildrenTab kids={[]}/>}
        {activeTab === "classes" && <ClassesTab/>}
        {activeTab === "fundraisers" && (
          <FundraiserTab isTreasurer={false} />
        )}
        {activeTab === "transactions" && (
          <TransactionTab />
        )}
        {activeTab === "accountancy" && (
          <AccountingTab />
        )}
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
