import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const fmt = (num) => {
  const n = parseFloat(num)
  return isNaN(n) ? '0.00' : n.toFixed(2)
}

export const generateBillPDF = (shopData, billData, cartItems) => {
  const doc = new jsPDF()

  // Header
  doc.setFillColor(99, 102, 241)
  doc.rect(0, 0, 210, 38, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(String(shopData.shopName || 'Shop'), 14, 16)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('GST: ' + String(shopData.gstNumber || 'N/A'), 14, 24)
  doc.text('Phone: ' + String(shopData.phone || 'N/A'), 14, 30)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('INVOICE', 160, 16)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Bill No: #' + String(billData.billNumber || 1), 160, 24)
  doc.text('Date: ' + new Date(billData.createdAt).toLocaleDateString('en-IN'), 160, 30)

  // Customer Box
  doc.setFillColor(243, 244, 255)
  doc.rect(10, 43, 190, 22, 'F')
  doc.setTextColor(50, 50, 100)
  doc.setFontSize(9)
  doc.text('Customer: ' + String(billData.customerName || 'N/A'), 14, 51)
  doc.text('Phone: ' + String(billData.customerPhone || 'N/A'), 14, 58)
  doc.text('Payment: ' + String(billData.paymentMode || 'Cash'), 110, 58)

  // Table rows
  const rows = cartItems.map((item, i) => {
    const price = parseFloat(item.sellingPrice) || 0
    const qty = parseInt(item.qty) || 0
    const gstPct = parseFloat(item.gstPercent) || 0
    const base = price * qty
    const gstAmt = (base * gstPct) / 100
    const total = base + gstAmt
    return [
      String(i + 1),
      String(item.name || 'Item'),
      String(qty),
      'Rs. ' + fmt(price),
      fmt(gstPct) + '%',
      'Rs. ' + fmt(total)
    ]
  })

  autoTable(doc, {
    startY: 70,
    head: [['#', 'Item', 'Qty', 'Price', 'GST%', 'Amount']],
    body: rows,
    styles: { fontSize: 9, cellPadding: 4, font: 'helvetica' },
    headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 249, 255] },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 60 },
      2: { cellWidth: 20 },
      3: { cellWidth: 35 },
      4: { cellWidth: 25 },
      5: { cellWidth: 35 }
    },
    theme: 'striped',
    margin: { left: 10, right: 10 }
  })

  const finalY = doc.lastAutoTable.finalY + 8

  // Summary
  doc.setFillColor(243, 244, 255)
  doc.rect(120, finalY, 80, 50, 'F')
  doc.setDrawColor(99, 102, 241)
  doc.rect(120, finalY, 80, 50, 'S')
  doc.setTextColor(80, 80, 120)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  doc.text('Subtotal:', 125, finalY + 12)
  doc.text('Rs. ' + fmt(billData.subtotal), 197, finalY + 12, { align: 'right' })

  doc.text('GST Amount:', 125, finalY + 24)
  doc.text('Rs. ' + fmt(billData.gstAmount), 197, finalY + 24, { align: 'right' })

  doc.setDrawColor(180, 180, 220)
  doc.line(125, finalY + 30, 197, finalY + 30)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(99, 102, 241)
  doc.text('TOTAL:', 125, finalY + 42)
  doc.text('Rs. ' + fmt(billData.totalAmount), 197, finalY + 42, { align: 'right' })

  // Footer
  doc.setFillColor(99, 102, 241)
  doc.rect(0, 280, 210, 17, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Thank you for shopping! — Powered by SellNiti', 105, 290, { align: 'center' })

  const name = String(billData.customerName || 'Customer').replace(/\s+/g, '-')
  doc.save('Bill-' + String(billData.billNumber) + '-' + name + '.pdf')
}
