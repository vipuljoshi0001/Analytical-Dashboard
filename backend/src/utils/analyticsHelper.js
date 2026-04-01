export const getMonthlyBreakdown = (bills, year = new Date().getFullYear()) => {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(year, i).toLocaleString('default', { month: 'short' }),
    sales: 0,
    profit: 0,
    orders: 0
  }))

  bills.forEach(bill => {
    const d = new Date(bill.createdAt)
    if (d.getFullYear() === year) {
      const m = d.getMonth()
      months[m].sales += bill.totalAmount || 0
      months[m].orders += 1
    }
  })

  return months
}

export const getPeakSalesDay = (bills) => {
  const days = {}
  bills.forEach(bill => {
    const day = new Date(bill.createdAt).toLocaleDateString('en-IN', { weekday: 'long' })
    days[day] = (days[day] || 0) + (bill.totalAmount || 0)
  })
  return Object.entries(days).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No data'
}

export const calculateProfitMargin = (revenue, cost) => {
  if (revenue === 0) return 0
  return (((revenue - cost) / revenue) * 100).toFixed(1)
}