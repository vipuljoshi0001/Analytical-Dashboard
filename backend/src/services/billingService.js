import { calculateGST } from '../utils/gstCalculator.js'
import { generateBillNumber } from '../utils/billNumberGenerator.js'

export const processBill = (shopId, items, customerData, paymentMode) => {
  const { subtotal, gstAmount, total } = calculateGST(items)
  return {
    shopId,
    customerName: customerData.name,
    customerPhone: customerData.phone,
    items,
    subtotal,
    gstAmount,
    totalAmount: total,
    paymentMode,
    createdAt: new Date().toISOString()
  }
}

export const getBillStats = (bills) => {
  const total = bills.reduce((s, b) => s + (b.totalAmount || 0), 0)
  const avg = bills.length > 0 ? total / bills.length : 0
  const max = bills.reduce((m, b) => Math.max(m, b.totalAmount || 0), 0)
  return { total, average: avg.toFixed(2), highest: max, count: bills.length }
}