import { validateInventoryItem } from '../models/inventoryModel.js'

export const validateItem = async (req, res) => {
  try {
    const { valid, error } = validateInventoryItem(req.body)
    if (!valid) return res.status(400).json({ valid: false, error })
    res.json({ valid: true, message: 'Item data is valid' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getInventoryStats = async (req, res) => {
  try {
    const { items } = req.body
    if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'Items array required' })
    const stats = {
      total: items.length,
      outOfStock: items.filter(i => i.quantity === 0).length,
      lowStock: items.filter(i => i.quantity > 0 && i.quantity <= (i.lowStockAt || 5)).length,
      totalValue: items.reduce((s, i) => s + (i.sellingPrice * i.quantity), 0),
      totalCost: items.reduce((s, i) => s + (i.costPrice * i.quantity), 0)
    }
    res.json(stats)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}