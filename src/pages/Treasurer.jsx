import Header from "../components/Header";
import Panel from "../components/Panel";
import TransactionTab from "../components/tabs/TransactionTab";
import AccountingTab from "../components/tabs/AccountingTab";
import FundraiserTab from "../components/tabs/FundraiserTabTreasurer";
import MyClassesTab from "../components/tabs/MyClassesTab";
import {useEffect, useState} from 'react'
import {useUserData} from "../contexts/UserDataContext";
import {getAllClasses, getTransactions} from '../services/treasurer'
import {useAuth} from '../contexts/AuthContext'

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

const fundraisersData = [
    {
        id: "f1",
        name: "Wyjazd w góry",
        goal: "Cel: zbieramy na klasowy wyjazd w góry, żeby spędzić razem niezapomniany czas, oderwać się od ekranów i przeżyć prawdziwą przygodę w naturze! Chcemy zdobyć szczyty, zobaczyć wschód słońca i po prostu dobrze się bawić razem.",
        imageUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        description: `Opis: Dlaczego zbieramy?
Nasz cel to umożliwić wyjazd wszystkim uczniom z klasy, niezależnie od sytuacji finansowej. Zebrane środki przeznaczymy na:
• transport (autokar),
• noclegi w schronisku lub pensjonacie,
• wyżywienie,
• bilety wstępu i drobne atrakcje (np. park linowy, muzeum przyrodnicze).
Chcemy, żeby nikt nie został w domu tylko dlatego, że nie mógł sobie pozwolić na wyjazd. Każda złotówka przybliża nas do wspólnego celu
Dlaczego góry?
Bo góry uczą pokory, cierpliwości i współpracy. Na szlaku nie liczy się, kto jest najlepszy z matmy czy polskiego, tylko to, że razem pomagamy sobie wejść na szczyt. To nie tylko wyjazd, to lekcja przyjaźni, współdziałania i odpowiedzialności.`,
        endDate: "12.10.2025",
        amount: 250,
        organizer: "Kamil Kowalski",
        isExpandedDefault: true,
        badges: [
            {text: "Wpłacono", type: "blue"},
            {text: "Aktywna", type: "green"},
        ],
        children: [
            {
                id: "s9",
                name: "Zofia Kowalska",
                amountPaid: 200,
                avatar: null,
            },
            {
                id: "s1",
                name: "Jan Kowalski",
                amountPaid: 250,
                avatar: null,
            },
        ],
    },
];

const Treasurer = () => {
    const [activeTab, setActiveTab] = useState("myclasses");
    const {token} = useAuth();
    const {user} = useUserData();

    const [classes, setClasses] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getAllClasses(token).then(
            (data) => {
                setClasses(data);
            }
        )

        getTransactions(token).then(
            (data) => {
                setTransactions(data);
            }
        )

    }, [token])

    return (
        <>
            <Header balance={432.32}/>
            <div style={styles.container}>
                {/* Stats */}
                <div style={{display: "flex", gap: "16px", marginBottom: "24px"}}>
                    <Panel title="Moje klasy" value={user.classes.length}/>
                    <Panel title="Aktywne zbiórki" value="1"/>
                    <Panel title="Transakcje" value="5"/>
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
                    <MyClassesTab classesData={classesData}/>
                )}
                {activeTab === "fundraisers" && (
                    <FundraiserTab fundraisersData={fundraisersData} isTreasurer={true}/>
                )}
                {activeTab === "transactions" && (
                    <TransactionTab transactionsData={transactions}/>
                )}
                {activeTab === "accountancy" && (
                    <AccountingTab accountingData={accountingData}/>
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

export default Treasurer;
