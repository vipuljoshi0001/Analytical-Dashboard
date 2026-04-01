// Firestore Document Schema Reference (not enforced — just documentation)
export const ShopSchema = {
  shopId: 'string',        // Firebase UID
  shopName: 'string',
  gstNumber: 'string',     // 15-digit GSTIN
  phone: 'string',
  email: 'string',
  billCounter: 'number',   // Auto-increment bill number
  createdAt: 'ISO string'
}

export const validateShop = (data) => {
  const required = ['shopName', 'gstNumber', 'phone', 'email']
  return required.every(key => data[key] && data[key].toString().trim() !== '')
}