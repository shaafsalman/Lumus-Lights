import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from './../assets/logoLight.png';


const formatNumber = (number, columnName) => {
  if (typeof number !== 'number') return number;

  if (columnName === 'totalPcs') return number.toLocaleString(); 
  if (columnName.toLowerCase() === 'packagescount') return Math.floor(number).toLocaleString(); 

  // Default formatting for all other numbers
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const PDFReport = (data, columns, title, details) => {
  const doc = new jsPDF({ format: [420, 297] });

  const logoWidth = 20;
  const logoHeight = 20;
  const logoX = 10;
  const logoY = 10;
  doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = pageWidth / 2;
  const titleY = logoY + logoHeight + 10;
  doc.text(title, titleX, titleY, { align: 'center' });





  const detailsText = Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('  |  ');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  const detailsTextWidth = doc.getTextWidth(detailsText);
  const detailsX = titleX - detailsTextWidth / 2;
  doc.text(detailsText, detailsX, titleY + 10);



  
  
  const numericColumnIndices = columns.map((col, idx) =>
    col.key.toLowerCase() !== 'masterAwb' &&
    col.key.toLowerCase() !== 'houseAwb' &&
    data.every(row => typeof row[col.key] === 'number') ? idx : -1
  ).filter(idx => idx !== -1);

  const totals = numericColumnIndices.map(colIdx =>
    data.reduce((sum, row) => sum + (row[columns[colIdx].key] || 0), 0)
  );

  const bodyData = [
    ...data.map(row => columns.map(col =>
      numericColumnIndices.includes(columns.indexOf(col))
        ? formatNumber(row[col.key], col.key) // Pass column name to formatNumber
        : row[col.key]
    )),
    columns.map((col, idx) => {
      if (idx === 0) return 'Total';
      return numericColumnIndices.includes(idx) ? formatNumber(totals[numericColumnIndices.indexOf(idx)], col.key) : '';
    }),
  ];

  autoTable(doc, {
    startY: titleY + 20,
    head: [columns.map(col => col.label)],
    body: bodyData,
    theme: 'striped',
    headStyles: {
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
      fontSize: 8,
    },
    styles: {
      cellPadding: 2,
      fontSize: 8,
      textColor: [50, 50, 50],
      lineColor: [200, 200, 200],
      lineWidth: 0.3,
      fillColor: [255, 255, 255],
    },
    columnStyles: columns.reduce((styles, col, idx) => {
      styles[idx] = {
        halign: numericColumnIndices.includes(idx) ? 'right' : 'left'
      };
      return styles;
    }, {}),
    footStyles: {
      fillColor: [200, 200, 200],
      textColor: [0, 0, 0],
      fontSize: 8,
      fontStyle: 'bold',
    },
    margin: { top: 5 },
  });

  return doc.output('blob');
};

export default PDFReport;
