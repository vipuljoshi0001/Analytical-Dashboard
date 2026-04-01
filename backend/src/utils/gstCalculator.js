export const calculateGST = (items) => {
  let subtotal = 0
  let gstAmount = 0

  items.forEach(item => {
    const base = (item.sellingPrice || 0) * (item.qty || 1)
    const gst = (base * (item.gstPercent || 0)) / 100
    subtotal += base
    gstAmount += gst
  })

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    gstAmount: parseFloat(gstAmount.toFixed(2)),
    total: parseFloat((subtotal + gstAmount).toFixed(2))
  }
}

export const getGSTSlab = (amount) => {
  if (amount <= 0) return 0
  if (amount <= 1000) return 5
  if (amount <= 7500) return 12
  return 18
}