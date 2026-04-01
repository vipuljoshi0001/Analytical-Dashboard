export const calculateGST = (price, qty, gstPercent) => {
  const base = price * qty
  const gst = (base * gstPercent) / 100
  return { base, gst, total: base + gst }
}

export const calculateCartGST = (items) => {
  return items.reduce((acc, item) => {
    const { base, gst, total } = calculateGST(item.sellingPrice, item.qty, item.gstPercent || 0)
    return {
      subtotal: acc.subtotal + base,
      gstAmount: acc.gstAmount + gst,
      total: acc.total + total
    }
  }, { subtotal: 0, gstAmount: 0, total: 0 })
}

export const getGSTBreakdown = (items) => {
  const breakdown = {}
  items.forEach(item => {
    const rate = item.gstPercent || 0
    const amount = (item.sellingPrice * item.qty * rate) / 100
    breakdown[rate] = (breakdown[rate] || 0) + amount
  })
  return breakdown
}