export const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0
  return (((current - previous) / previous) * 100).toFixed(1)
}

export const getTopProducts = (bills, limit = 5) => {
  const counts = {}
  bills.forEach(bill => {
    (bill.items || []).forEach(item => {
      counts[item.itemId] = {
        itemId: item.itemId,
        name: item.name || 'Unknown',
        qty: (counts[item.itemId]?.qty || 0) + (item.qty || 0),
        revenue: (counts[item.itemId]?.revenue || 0) + ((item.sellingPrice || 0) * (item.qty || 0))
      }
    })
  })
  return Object.values(counts)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, limit)
}

export const groupByMonth = (bills) => {
  const months = {}
  bills.forEach(bill => {
    const d = new Date(bill.createdAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    months[key] = (months[key] || 0) + (bill.totalAmount || 0)
  })
  return months
}