import Header from "../components/HeaderAdmin";
import Panel from "../components/Panel";
import UsersTab from "../components/tabs/UsersTab";
import ClassesTab from "../components/tabs/ClassesTabAdmin";
import FundraiserTab from "../components/tabs/FundraiserTabAdmin";
import RaportTab from "../components/tabs/RaportTab";
import { useState, useEffect } from "react";
import { getAllParents } from "../services/parent";
import { getAllClasses } from "../services/schoolClass";
import { getAllFundraisers } from "../services/fundraising";
import { useFormatDate } from "../hooks/useFormatDate";

import { useAuth } from "../contexts/AuthContext";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [fundraisersData, setFundraisersData] = useState([]);
  // Wywołanie w kodzie:
  // {activeTab === "classes" && <ClassesTab classesData={classesData} setClassesData={setClassesData} />}
  const [activeTab, setActiveTab] = useState("users");

  const { token } = useAuth();
  const { formatToDateString } = useFormatDate();

  useEffect(() => {
    if(token) {
        getAllParents(token)
            .then(data => {
                const mappedUsers = data.map(u => ({
                    id: u.id,
                    name: `${u.name} ${u.surname}`,
                    email: u.email,
                    status: u.blocked ? "Zablokowany" : "Aktywny",
                    createdAt: u.createdAt ? formatToDateString(new Date(u.createdAt)) : "-",
                    role: u.role === "TREASURER" ? "Skarbnik" : (u.role === "ADMIN" ? "Admin" : "Rodzic")
                }));
                setUsers(mappedUsers);
            })
            .catch(console.error);

        getAllClasses(token)
            .then(data => {
                const mappedClasses = data.map(c => ({
                    id: c.id,
                    name: c.name,
                    year: c.year,
                    openCollections: c.openCollections,
                    allCollections: c.allCollections,
                    studentsCount: c.childrenCount,
                    treasurerName: c.classTreasurerName,
                    uid: c.id,
                    status: c.blocked ? "Zablokowana" : "Aktywna",
                }));
                setClassesData(mappedClasses);
            })
            .catch(console.error);

        getAllFundraisers(token)
            .then(data => {
                const mappedFundraisers = data.map(f => ({
                    id: f.id,
                    name: f.name,
                    className: f.className,
                    treasurer: f.classTreasurerName,
                    goal: f.amount,
                    collected: f.amountCollected,
                    createdAt: f.startDate ? formatToDateString(new Date(f.startDate)) : "-",
                    endDate: f.endDate ? formatToDateString(new Date(f.endDate)) : "brak",
                    status: f.status === "active" ? "Aktywna" : "Zakończona",
                }));
                setFundraisersData(mappedFundraisers);
            })
            .catch(console.error);
    }
  }, [token, formatToDateString]);

  return (
    <>
      <Header />
      <div style={styles.container}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <Panel title="Wszyscy użytkownicy" value={users.length} />
          <Panel title="Skarbnicy" value={users.filter(user => user.role==="Skarbnik").length} />
          <Panel title="Zbiórki" value={fundraisersData.length} />
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          <span
            style={activeTab === "users" ? styles.navTabActive : styles.navTab}
            onClick={() => setActiveTab("users")}
          >
            Użytkownicy
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
              activeTab === "raports" ? styles.navTabActive : styles.navTab
            }
            onClick={() => setActiveTab("raports")}
          >
            Raporty
          </span>
        </nav>

        {/* Tabs content*/}
        {activeTab === "users" && (
          <UsersTab users={users} setUsers={setUsers} />
        )}
        {activeTab === "classes" && (
          <ClassesTab
            classesData={classesData}
            setClassesData={setClassesData}
          />
        )}
        {activeTab === "fundraisers" && (
          <FundraiserTab
            fundraisersData={fundraisersData}
            setFundraisersData={setFundraisersData}
          />
        )}
        {activeTab === "raports" && (
          <RaportTab
            users={users}
            classesData={classesData}
            fundraisersData={fundraisersData}
          />
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

export default Admin;
