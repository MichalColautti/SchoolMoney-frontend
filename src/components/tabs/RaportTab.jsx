import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RaportTab = ({ users, classesData, fundraisersData }) => {
  // Agregacja danych do raportu i widoku
  const stats = {
    użytkownicy: {
      total: users?.length || 0,
      rodzice: users?.filter((u) => u.role === "Rodzic").length || 0,
      skarbnicy: users?.filter((u) => u.role === "Skarbnik").length || 0,
      admini: users?.filter((u) => u.role === "Admin").length || 0,
      zablokowani: users?.filter((u) => u.status === "Zablokowany").length || 0,
    },
    klasy: {
      suma: classesData?.length || 0,
      aktywne: classesData?.filter((c) => c.status === "Aktywna").length || 0,
      zablokowane:
        classesData?.filter((c) => c.status === "Zablokowana").length || 0,
      uczniowie:
        classesData?.reduce(
          (acc, curr) => acc + (Number(curr.studentsCount) || 0),
          0,
        ) || 0,
    },
    finanse: {
      aktywne:
        fundraisersData?.filter((f) => f.status === "Aktywna").length || 0,
      zamkniete:
        fundraisersData?.filter((f) => f.status === "Zakończona").length || 0,
      sumaZebrana:
        fundraisersData?.reduce(
          (acc, curr) => acc + (Number(curr.collected) || 0),
          0,
        ) || 0,
      celSuma:
        fundraisersData?.reduce(
          (acc, curr) => acc + (Number(curr.goal) || 0),
          0,
        ) || 0,
    },
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // 1. Elegancji Nagłówek
    doc.setFillColor(43, 127, 255);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("RAPORT SYSTEMU SCHOOLMONEY", 14, 25);
    doc.setFontSize(10);
    doc.text(`Data wygenerowania: ${date}`, 14, 33);

    // 2. Sekcja Statystyk Ogólnych
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("I. PODSUMOWANIE SYSTEMU", 14, 55);

    doc.autoTable({
      startY: 60,
      body: [
        [
          "Liczba uzytkownikow",
          stats.użytkownicy.total,
          "Aktywne klasy",
          stats.klasy.aktywne,
        ],
        [
          "Suma uczniow",
          stats.klasy.uczniowie,
          "Aktywne zbiorki",
          stats.finanse.aktywne,
        ],
        [
          "Zebrane srodki",
          `${stats.finanse.sumaZebrana} PLN`,
          "Zablokowane konta",
          stats.użytkownicy.zablokowani,
        ],
      ],
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 3 },
    });

    // 3. Tabela Klas (Nowość)
    doc.text("II. SZCZEGOLY KLAS", 14, doc.lastAutoTable.finalY + 15);
    const classesRows = classesData.map((c) => [
      c.name,
      c.year || "2024/2025",
      c.studentsCount,
      c.skarbnik || "Nie przypisano",
      c.status,
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Nazwa klasy", "Rocznik", "Uczniowie", "Skarbnik", "Status"]],
      body: classesRows,
      headStyles: { fillColor: [100, 100, 100] },
    });

    // 4. Tabela Zbiórek
    doc.text("III. SZCZEGOLY ZBIOREK", 14, doc.lastAutoTable.finalY + 15);
    const fundraisersRows = fundraisersData.map((f) => [
      f.name,
      `${f.collected} / ${f.goal} PLN`,
      `${Math.round((f.collected / f.goal) * 100)}%`,
      f.status,
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Cel zbiorki", "Kwota", "Postep", "Status"]],
      body: fundraisersRows,
      headStyles: { fillColor: [43, 127, 255] },
    });

    doc.save(`Raport_Globalny_${date.replace(/\./g, "_")}.pdf`);
  };

  return (
    <div style={styles.mainWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Centrum Raportowania</h2>
          <p style={styles.subtitle}>
            Skompresowany podgląd wszystkich modułów
          </p>
        </div>

        <div style={styles.statsGrid}>
          {/* KARTA UŻYTKOWNICY */}
          <div style={styles.statCard}>
            <h4 style={styles.cardTitle}>Użytkownicy</h4>
            <div style={styles.details}>
              <p>
                Rodzice: <span>{stats.użytkownicy.rodzice}</span>
              </p>
              <p>
                Skarbnicy: <span>{stats.użytkownicy.skarbnicy}</span>
              </p>
              <p style={{ color: "#FF5C5C" }}>
                Zablokowani: <span>{stats.użytkownicy.zablokowani}</span>
              </p>
            </div>
            <div style={styles.totalBadge}>
              {stats.użytkownicy.total} łączone
            </div>
          </div>

          {/* KARTA KLASY - Zgodnie z życzeniem */}
          <div style={styles.statCard}>
            <h4 style={styles.cardTitle}>Klasy i Uczniowie</h4>
            <div style={styles.details}>
              <p>
                Liczba klas: <span>{stats.klasy.suma}</span>
              </p>
              <p>
                Aktywne: <span>{stats.klasy.aktywne}</span>
              </p>
              <p>
                Suma uczniów: <span>{stats.klasy.uczniowie}</span>
              </p>
            </div>
            <div style={{ ...styles.totalBadge, background: "#63FF63" }}>
              {stats.klasy.aktywne} aktywne
            </div>
          </div>

          {/* KARTA ZBIÓRKI */}
          <div style={styles.statCard}>
            <h4 style={styles.cardTitle}>Zbiórki i Finanse</h4>
            <div style={styles.details}>
              <p>
                Aktywne: <span>{stats.finanse.aktywne}</span>
              </p>
              <p>
                Zamknięte: <span>{stats.finanse.zamkniete}</span>
              </p>
              <p>
                Zebrano:{" "}
                <span style={{ color: "#2B7FFF", fontWeight: "bold" }}>
                  {stats.finanse.sumaZebrana} zł
                </span>
              </p>
            </div>
            <div style={{ ...styles.totalBadge, background: "#2B7FFF" }}>
              {stats.finanse.sumaZebrana} PLN
            </div>
          </div>
        </div>

        <div style={styles.actionArea}>
          <button style={styles.exportBtn} onClick={generatePDF}>
            Eksportuj pełny raport PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: { width: "100%", padding: "20px" },
  container: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  header: {
    marginBottom: "30px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "20px",
  },
  title: { fontSize: "24px", fontWeight: "700", color: "#333", margin: 0 },
  subtitle: { color: "#888", marginTop: "5px", fontSize: "14px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    marginBottom: "40px",
  },
  statCard: {
    background: "#F8FAFD",
    padding: "25px",
    borderRadius: "18px",
    border: "1px solid #E8F0FB",
    position: "relative",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#444",
    marginBottom: "15px",
    marginTop: 0,
  },
  details: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.8",
    "& p": { display: "flex", justifyContent: "space-between" },
  },
  totalBadge: {
    marginTop: "15px",
    padding: "8px 12px",
    background: "#888",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block",
  },
  actionArea: { textAlign: "center" },
  exportBtn: {
    background: "#2B7FFF",
    color: "#fff",
    border: "none",
    padding: "16px 50px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(43, 127, 255, 0.4)",
    transition: "transform 0.2s",
  },
};

export default RaportTab;
