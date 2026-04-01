export const BillSchema = {
  billId: 'string',
  shopId: 'string',
  billNumber: 'number',
  customerName: 'string',
  customerPhone: 'string',
  items: [{
    itemId: 'string',
    name: 'string',
    qty: 'number',
    sellingPrice: 'number',
    gstPercent: 'number'
  }],
  subtotal: 'number',
  gstAmount: 'number',
  totalAmount: 'number',
  paymentMode: 'string',
  createdAt: 'ISO string'
}

export const validateBill = (data) => {
  if (!data.customerName) return { valid: false, error: 'Customer name required' }
  if (!data.items || data.items.length === 0) return { valid: false, error: 'No items in bill' }
  if (data.totalAmount <= 0) return { valid: false, error: 'Invalid total amount' }
  return { valid: true }
}