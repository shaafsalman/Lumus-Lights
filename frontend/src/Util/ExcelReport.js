import ExcelJS from 'exceljs';

const formatNumber = (number, columnName) => {
  if (typeof number !== 'number') return number;

  if (columnName === 'totalPcs') return number.toLocaleString(); 
  if (columnName.toLowerCase() === 'packagescount') return Math.floor(number).toLocaleString(); 

  // Default formatting for all other numbers
  return number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const ExcelReport = (data, columns, title, details) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  // Define cell styles
  const titleStyle = {
    font: { bold: true, size: 16, color: { argb: 'FFFFFFFF' } },
    alignment: { horizontal: 'center', vertical: 'middle' },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '4F8C2C' } }
  };
  const operatorStyle = {
    font: { size: 12 },
    alignment: { horizontal: 'center' }
  };
  const detailsHeaderStyle = {
    font: { bold: true },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D0E0E0' } }
  };
  const detailsRowStyle = {
    font: { size: 10 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F0F0F0' } }
  };
  const headerStyle = {
    font: { bold: true, size: 12 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '4F8C2C' } },
    font: { color: { argb: 'FFFFFFFF' } },
    alignment: { horizontal: 'center', vertical: 'middle' }
  };
  const totalStyle = {
    font: { bold: true },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'D0E0E0' } },
    alignment: { horizontal: 'right', vertical: 'middle' }
  };

  // Determine the last column letter
  const totalColumns = columns.length + 4; // Add extra columns for details
  const lastColumnLetter = String.fromCharCode(65 + totalColumns - 1);

  // Add title row
  worksheet.mergeCells(`A1:${lastColumnLetter}1`);
  worksheet.getCell('A1').value = title;
  worksheet.getCell('A1').style = titleStyle;
  worksheet.getRow(1).height = 30; // Increase height for title

  // Add operator row
  worksheet.mergeCells(`A2:${lastColumnLetter}2`);
  worksheet.getCell('A2').value = 'Operator: Daallo Airlines';
  worksheet.getCell('A2').style = operatorStyle;

  // Add details in rows with a maximum of four per row and 2 cell gaps
  let currentRowIndex = 3;
  Object.entries(details).forEach(([key, value], index) => {
    const colIndex = (index % 4) * 3 + 1; // Start new row for every four details

    const labelCell = worksheet.getCell(currentRowIndex, colIndex);
    labelCell.value = key;
    labelCell.style = detailsHeaderStyle;
    labelCell.alignment = { horizontal: 'left', vertical: 'middle' };

    const valueCell = worksheet.getCell(currentRowIndex, colIndex + 1);
    valueCell.value = value;
    valueCell.style = detailsRowStyle;
    valueCell.alignment = { horizontal: 'left', vertical: 'middle' };

    // Move to next row after every four details
    if (index % 4 === 3) {
      currentRowIndex++;
    }
  });

  // Add table headers
  const tableHeader = columns.map(col => col.label);
  const headerRow = worksheet.addRow(tableHeader);
  headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    cell.style = headerStyle;
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });
  headerRow.height = 25; // Increase height for headers

  // Add data table
  data.forEach(row => {
    const formattedRow = columns.map(col => {
      const cellValue = row[col.key] || '';
      return typeof cellValue === 'number' ? formatNumber(cellValue, col.key) : cellValue;
    });
    worksheet.addRow(formattedRow);
  });

  // Calculate totals for specified columns
  const totalColumnsToSum = ['Revenue', 'Total Weight (kg)', 'Total Pcs', 'OTHER. CHR.', 'CASH', 'ON ACCOUNT', 'COD', 'PCS', 'WEIGHT (Kg)', 'CHR. WEIGHT(Kg)'];
  const totalValues = {};

  totalColumnsToSum.forEach(colLabel => {
    const colIndex = columns.findIndex(col => col.label === colLabel);
    if (colIndex !== -1) {
      const columnKey = columns[colIndex].key;
      let total = 0;

      data.forEach(row => {
        const value = parseFloat(row[columnKey]);
        if (!isNaN(value)) total += value;
      });

      totalValues[colLabel] = total;
    }
  });

  // Add totals row at the end of the sheet
  const totalsStartRow = worksheet.lastRow.number + 2;
  worksheet.getCell(totalsStartRow, 1).value = 'Total';
  worksheet.getCell(totalsStartRow, 1).style = totalStyle;

  totalColumnsToSum.forEach((colLabel, index) => {
    const colIndex = columns.findIndex(col => col.label === colLabel);
    if (colIndex !== -1) {
      worksheet.getCell(totalsStartRow, colIndex + 2).value = formatNumber(totalValues[colLabel] || 0, colLabel);
      worksheet.getCell(totalsStartRow, colIndex + 2).style = totalStyle;
    }
  });

  // Adjust column widths based on maximum content length
  columns.forEach((col, index) => {
    const columnLetter = String.fromCharCode(65 + index); // Convert index to column letter
    let maxLength = col.label.length; // Initialize with header length

    // Find the maximum length of the data in the column
    data.forEach(row => {
      const cellValue = (row[col.key] || '').toString();
      if (cellValue.length > maxLength) maxLength = cellValue.length;
    });

    // Add padding to the maximum length
    worksheet.getColumn(index + 1).width = maxLength + 5; // Adjust padding as needed
  });

  // Adjust the width of the last column to match the title width
  const titleWidth = worksheet.getColumn(1).width * totalColumns;
  worksheet.columns.forEach(col => {
    col.width = (titleWidth / totalColumns); // Ensure columns fit the title width
  });

  // Generate the file
  return workbook.xlsx.writeBuffer().then(buffer => new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
};

export default ExcelReport;
