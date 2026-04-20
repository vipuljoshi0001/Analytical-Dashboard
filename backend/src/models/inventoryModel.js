export const InventorySchema = {
  itemId: 'string',
  shopId: 'string',
  name: 'string',
  category: 'string',
  costPrice: 'number',
  sellingPrice: 'number',
  quantity: 'number',
  gstPercent: 'number',  
  lowStockAt: 'number',
  createdAt: 'ISO string'
}

export const validateInventoryItem = (data) => {
  if (!data.name || data.name.trim() === '') return { valid: false, error: 'Product name is required' }
  if (data.costPrice < 0) return { valid: false, error: 'Cost price cannot be negative' }
  if (data.sellingPrice < 0) return { valid: false, error: 'Selling price cannot be negative' }
  if (data.quantity < 0) return { valid: false, error: 'Quantity cannot be negative' }
  if (![0, 5, 12, 18, 28].includes(Number(data.gstPercent))) return { valid: false, error: 'Invalid GST rate' }
  return { valid: true }
}
