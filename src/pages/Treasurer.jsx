import Header from "../components/Header";
import Panel from "../components/Panel";
import TransactionTab from "../components/tabs/TransactionTab";
import AccountingTab from "../components/tabs/AccountingTab";
import FundraiserTab from "../components/tabs/FundraiserTabTreasurer";
import MyClassesTab from "../components/tabs/MyClassesTab";
import {useEffect, useState} from 'react'
import {useUserData} from "../contexts/UserDataContext";
import {useAuth} from '../contexts/AuthContext'
import {getTreasurerStatus} from "../services/treasurer";

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
            {id: "s1", name: "Jan Kowalski"},
            {id: "s2", name: "Jan Kowalski"},
            {id: "s3", name: "Jan Kowalski"},
            {id: "s4", name: "Jan Kowalski"},
            {id: "s5", name: "Jan Kowalski"},
            {id: "s6", name: "Jan Kowalski"},
            {id: "s7", name: "Jan Kowalski"},
            {id: "s8", name: "Jan Kowalski"},
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
            {id: "s9", name: "Zofia Nowak"},
            {id: "s10", name: "Maciej Kowalski"},
        ],
    },
];



const accountingData = [
    {
        id: "classId",
        name: "Klasa 4c",
        year: "2024/2025",
        fundraisers: [
            {
                id: "funId1",
                name: "Wyjazd w góry",
                documents: [
                    {
                        id: "doc1",
                        number: "Faktura #2024/11/01",
                        date: "25.01.2025",
                        amount: "2500.00 zł",
                        description: "Ubezpieczenie grupowe uczestników wycieczki",
                        status: "settled",
                    },
                ],
            },
            {
                id: "funId2",
                name: "Dzień Nauczyciela",
                documents: [
                    {
                        id: "doc3",
                        number: "Faktura #KWIATY/10/2024",
                        date: "14.10.2024",
                        amount: "150.00 zł",
                        description: "Bukiet kwiatów dla wychowawcy",
                        status: "settled",
                    },
                ],
            },
        ],
    }
];

const Treasurer = () => {
    const [activeTab, setActiveTab] = useState("myclasses");
    const {token} = useAuth();


  const [stats, setStats] = useState({
        numberOfClasses: 0,
        numberOfFundraisings: 0,
        numberOfTransactions: 0
  });

  useEffect(() => {
    if(token){
        getTreasurerStatus(token).then(data => {
            if(data) setStats(data);
        }).catch(err => console.error(err))
    }
  }, [token]);

    return (
        <>
            <Header balance={432.32}/>
            <div style={styles.container}>
                {/* Stats */}
                <div style={{display: "flex", gap: "16px", marginBottom: "24px"}}>
                    <Panel title="Moje klasy" value={stats.numberOfClasses}/>
                    <Panel title="Aktywne zbiórki" value={stats.numberOfFundraisings}/>
                    <Panel title="Transakcje" value={stats.numberOfTransactions}/>
                </div>

                {/* Nav */}
                <nav style={styles.nav}>
          <span
              style={
                  activeTab === "myclasses" ? styles.navTabActive : styles.navTab
              }
              onClick={() => setActiveTab("myclasses")}
          >
            Moje klasy
          </span>
                    <span
                        style={
                            activeTab === "fundraisers" ? styles.navTabActive : styles.navTab
                        }
                        onClick={() => setActiveTab("fundraisers")}
                    >
            Moje zbiórki
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
            {" "}
                        Rachunkowość
          </span>
                </nav>

        {/* Tabs content*/}
        {activeTab === "myclasses" && (
          <MyClassesTab classesData={classesData} />
        )}
        {activeTab === "fundraisers" && (
          <FundraiserTab />
        )}
        {activeTab === "transactions" && (
          <TransactionTab isTreasurer={true} />
        )}
        {activeTab === "accountancy" && (
          <AccountingTab accountingData={accountingData} />
        )}
      </div>
    </>
  )
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

export default Treasurer;
