import { jsPDF } from "jspdf";

export function generateTransactionDocument(data) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    const primaryColor = 'rgb(41, 128, 185)';
    const textColor = 'rgb(44, 62, 80)';
    const lightGray = 'rgb(189, 195, 199)';

    doc.setTextColor(textColor);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    const title = data.fundraisingName.toUpperCase();
    doc.text(title, pageWidth / 2, 35, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(127, 140, 141);
    doc.text("POTWIERDZENIE TRANSAKCJI ELEKTRONICZNEJ", pageWidth / 2, 42, { align: "center" });

    doc.setDrawColor(lightGray);
    doc.line(margin, 50, pageWidth - margin, 50);

    const startY = 65;
    const lineHeight = 12;

    const drawRow = (label, value, y, isBoldValue = false) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(127, 140, 141);
        doc.text(label, margin, y);

        doc.setFont("helvetica", isBoldValue ? "bold" : "normal");
        doc.setFontSize(12);
        doc.setTextColor(textColor);
        doc.text(String(value), 75, y);
    };

    drawRow("Nadawca:", data.contributorName, startY);
    drawRow("Dziecko:", data.childName, startY + lineHeight);

    const status = data.status === "accepted" ? "ZAAKCEPTOWANA" : data.status === "refunded" ? "ZWRÓCONA" : "ANULOWANA";
    const statusColor = data.status === "accepted" ? 'rgb(39, 174, 96)' : 'rgb(231, 76, 60)';

    doc.setFont("helvetica", "bold");
    doc.setTextColor(127, 140, 141);
    doc.text("Status:", margin, startY + (lineHeight * 2));

    doc.setTextColor(statusColor);
    doc.text(status, 75, startY + (lineHeight * 2));

    drawRow("Data:", data.timestamp, startY + (lineHeight * 3));

    doc.setDrawColor(lightGray);
    doc.line(margin, startY + (lineHeight * 4), pageWidth - margin, startY + (lineHeight * 4));

    doc.setFontSize(14);
    doc.setTextColor(textColor);
    doc.setFont("helvetica", "bold");
    doc.text("SUMA:", margin, startY + (lineHeight * 5.5));

    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.text(data.amount, pageWidth - margin, startY + (lineHeight * 5.5), { align: "right" });

    doc.setFontSize(9);
    doc.setTextColor(189, 195, 199);
    const footerY = 280;
    doc.text("Dokument wygenerowany automatycznie przez system SchoolMoney.", pageWidth / 2, footerY, { align: "center" });

    const fileName = `Potwierdzenie_${data.fundraisingName.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
}