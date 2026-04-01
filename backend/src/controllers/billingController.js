import { validateBill } from '../models/billModel.js'
import { calculateGST } from '../utils/gstCalculator.js'

export const validateBillData = async (req, res) => {
  try {
    const { valid, error } = validateBill(req.body)
    if (!valid) return res.status(400).json({ valid: false, error })
    res.json({ valid: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const calculateBillGST = async (req, res) => {
  try {
    const { items } = req.body
    if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'Items required' })
    const { subtotal, gstAmount, total } = calculateGST(items)
    res.json({ subtotal, gstAmount, total })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}