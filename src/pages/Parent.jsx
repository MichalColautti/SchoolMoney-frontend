import Header from "../components/Header";
import Panel from "../components/Panel";
import ChildrenTab from "../components/ChildrenTab";
import ClassesTab from "../components/ClassesTab";
import TransactionTab from "../components/TransactionTab";
import AccountingTab from "../components/AccountingTab";
import FundraiserTab from "../components/FundraiserTab";
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

const transactionsData = [
  {
    id: "t1",
    classInfo: {
      name: "Klasa 4C",
      year: "2024/2025",
    },
    fundraiser: {
      name: "Wyjazd w góry",
    },
    transactionDate: "01.09.2025",
    bookingDate: "02.09.2025",
    amount: "250.00 zł",
    status: "failed",
    sender: {
      name: "Anna Kowal ul. Słoneczna 12/4, 00-101 Warszawa",
      account: "PL36 3221 8455 6609 7202 5870 7314",
    },
    recipient: {
      account: "PL31 2012 4992 1040 2274 5140 2342",
    },
    paymentMethod: "blik",
  },
  {
    id: "t2",
    classInfo: {
      name: "Klasa 1A",
      year: "2023/2024",
    },
    fundraiser: {
      name: "Wyjście do kina",
    },
    transactionDate: "30.08.2025",
    bookingDate: "30.08.2025",
    amount: "50.00 zł",
    status: "success",
    sender: {
      name: "Jan Kowalski, ul. Słoneczna 12/4, 00-101 Warszawa",
      account: "PL36 3221 8455 6609 7202 5870 7314",
    },
    recipient: {
      account: "PL31 2012 4992 1040 2274 5140 2342",
    },
    paymentMethod: "przelew tradycyjny",
  },
];

const accountingData = [
  {
    id: "class_c1",
    classInfo: {
      name: "Klasa 4c",
      year: "2024/2025",
    },
    fundraisers: [
      {
        id: "f1_report",
        fundraiser: {
          id: "f1",
          name: "Wyjazd w góry",
        },
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
        payouts: [
          {
            id: "p1",
            status: "paid_out",
            details: {
              transactionDate: "01.09.2025",
              bookingDate: "02.09.2025",
              status: "success",
              amount: "2500.00 zł",
              sender: {
                name: "Anna Kowal ul. Słoneczna 12/4, 00-101 Warszawa",
                account: "PL36 3221 8455 6609 7202 5870 7314",
              },
              recipient: {
                account: "PL31 2012 4992 1040 2274 5140 2342",
              },
              paymentMethod: "Blik",
            },
          },
        ],
      },
      {
        id: "f3_report",
        fundraiser: {
          id: "f3",
          name: "Dzień Nauczyciela",
        },
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
        payouts: [
          {
            id: "p3",
            status: "paid_out",
            details: {
              transactionDate: "14.10.2024",
              bookingDate: "14.10.2024",
              status: "success",
              amount: "150.00 zł",
              sender: {
                name: "Skarbnik Klasy 4c, Piotr Nowak",
                account: "PL36 3221 8455 6609 7202 5870 7314",
              },
              recipient: {
                account: "PL11 2222 3333 4444 5555 6666 7777",
              },
              paymentMethod: "Karta",
            },
          },
        ],
      },
    ],
  },
  {
    id: "class_c2",
    classInfo: {
      name: "Klasa 1A",
      year: "2023/2024",
    },
    fundraisers: [
      {
        id: "f2_report",
        fundraiser: {
          id: "f2",
          name: "Wyjście do kina",
        },
        documents: [
          {
            id: "doc2",
            number: "Faktura #KINO/2025/01",
            date: "20.01.2025",
            amount: "250.00 zł",
            description: "Bilety do kina dla klasy 1A",
            status: "settled",
          },
        ],
        payouts: [
          {
            id: "p2",
            status: "paid_out",
            details: {
              transactionDate: "21.01.2025",
              bookingDate: "21.01.2025",
              status: "success",
              amount: "250.00 zł",
              sender: {
                name: "Skarbnik Klasy 1A, Jan Nowak",
                account: "PL36 3221 8455 6609 7202 5870 7314",
              },
              recipient: {
                account: "PL80 1234 5678 9012 3456 7890 1234",
              },
              paymentMethod: "Przelew",
            },
          },
        ],
      },
    ],
  },
];

const fundraisersData = [
  {
    id: "f1",
    title: "Wyjazd w góry",
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
    costPerChild: 250,
    organizer: "Kamil Kowalski",
    isExpandedDefault: true,
    badges: [
      { text: "Wpłacono", type: "blue" },
      { text: "Aktywna", type: "green" },
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
        {activeTab === "children" && <ChildrenTab kids={kidsData} />}
        {activeTab === "classes" && <ClassesTab classesData={classesData} />}
        {activeTab === "fundraisers" && (
          <FundraiserTab fundraisersData={fundraisersData} />
        )}
        {activeTab === "transactions" && (
          <TransactionTab transactionsData={transactionsData} />
        )}
        {activeTab === "accountancy" && (
          <AccountingTab accountingData={accountingData} />
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
