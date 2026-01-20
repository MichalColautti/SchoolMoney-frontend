import Header from "../components/HeaderAdmin";
import Panel from "../components/Panel";
import UsersTab from "../components/tabs/UsersTab";
import ClassesTab from "../components/tabs/ClassesTabAdmin";
import FundraiserTab from "../components/tabs/FundraiserTabAdmin";
import RaportTab from "../components/tabs/RaportTab";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext";

const Admin = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Adam Mahaj",
      email: "adam@gmail.com",
      status: "Aktywny",
      createdAt: "07.03.2025",
      role: "Rodzic",
    },
    {
      id: 2,
      name: "Marek Nowak",
      email: "marek@gmail.com",
      status: "Aktywny",
      createdAt: "05.03.2025",
      role: "Skarbnik",
    },
    {
      id: 3,
      name: "Anna Kowalska",
      email: "ania@gmail.com",
      status: "Zablokowany",
      createdAt: "01.03.2025",
      role: "Admin",
    },
    {
      id: 4,
      name: "Piotr Zieliński",
      email: "piotr@gmail.com",
      status: "Aktywny",
      createdAt: "10.03.2025",
      role: "Skarbnik",
    },
  ]);
  const [classesData, setClassesData] = useState([
    {
      id: 1,
      name: "Klasa 4C",
      year: "2024/2025",
      openCollections: 3,
      closedCollections: 12,
      studentsCount: 25,
      treasurerName: "Marek Nowak",
      uid: "CLS-9921",
      status: "Aktywna",
    },
    {
      id: 2,
      name: "Klasa 1A",
      year: "2023/2024",
      openCollections: 0,
      closedCollections: 15,
      studentsCount: 20,
      treasurerName: "Anna Kowalska",
      uid: "CLS-4452",
      status: "Zablokowana",
    },
    {
      id: 3,
      name: "Klasa 8B",
      year: "2025/2026",
      openCollections: 5,
      closedCollections: 2,
      studentsCount: 30,
      treasurerName: "Piotr Zieliński",
      uid: "CLS-0012",
      status: "Aktywna",
    },
  ]);
  const [fundraisersData, setFundraisersData] = useState([
    {
      id: 1,
      name: "Wycieczka do Warszawy",
      className: "Klasa 4C",
      treasurer: "Marek Nowak",
      goal: 4000,
      collected: 2300,
      createdAt: "07.03.2025",
      endDate: "brak",
      status: "Aktywna",
    },
    {
      id: 2,
      name: "Kino - Marzec",
      className: "Klasa 1A",
      treasurer: "Anna Kowalska",
      goal: 500,
      collected: 500,
      createdAt: "01.03.2025",
      endDate: "20.03.2025",
      status: "Zakończona",
    },
    {
      id: 3,
      name: "Składka na komitet",
      className: "Klasa 8B",
      treasurer: "Piotr Zieliński",
      goal: 2000,
      collected: 1850,
      createdAt: "10.03.2025",
      endDate: "brak",
      status: "Aktywna",
    },
  ]);
  // Wywołanie w kodzie:
  // {activeTab === "classes" && <ClassesTab classesData={classesData} setClassesData={setClassesData} />}
  const [activeTab, setActiveTab] = useState("users");

  const { user } = useAuth();

  return (
    <>
      <Header />
      <div style={styles.container}>
        {/* Stats */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <Panel title="Wszyscy użytkownicy" value="250" />
          <Panel title="Skarbnicy" value="10" />
          <Panel title="Transakcje" value="5" />
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
