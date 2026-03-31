import { getBills } from './billingService'
import { getProducts } from './inventoryService'
import { startOfDay, startOfMonth, startOfYear, isAfter, parseISO } from 'date-fns'

export const getDashboardData = async (shopId) => {
  const [bills, products] = await Promise.all([
    getBills(shopId),
    getProducts(shopId)
  ])

  const now = new Date()
  const dayStart = startOfDay(now)
  const monthStart = startOfMonth(now)
  const yearStart = startOfYear(now)

  const todayBills = bills.filter(b => isAfter(parseISO(b.createdAt), dayStart))
  const monthBills = bills.filter(b => isAfter(parseISO(b.createdAt), monthStart))
  const yearBills = bills.filter(b => isAfter(parseISO(b.createdAt), yearStart))

  const sumTotal = arr => arr.reduce((s, b) => s + (b.totalAmount || 0), 0)
  const sumProfit = arr => arr.reduce((s, b) => {
    const profit = b.items?.reduce((p, i) => {
      const prod = products.find(pr => pr.itemId === i.itemId)
      return p + ((i.sellingPrice - (prod?.costPrice || 0)) * i.qty)
    }, 0) || 0
    return s + profit
  }, 0)

  // Top sellers
  const itemSales = {}
  bills.forEach(b => b.items?.forEach(i => {
    itemSales[i.itemId] = (itemSales[i.itemId] || 0) + i.qty
  }))
  const topSellers = Object.entries(itemSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, qty]) => {
      const p = products.find(pr => pr.itemId === id)
      return { ...p, soldQty: qty }
    })

  // Monthly chart data
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(now.getFullYear(), i, 1)
    const monthEnd = new Date(now.getFullYear(), i + 1, 0)
    const mBills = bills.filter(b => {
      const d = parseISO(b.createdAt)
      return d >= month && d <= monthEnd
    })
    return {
      month: month.toLocaleString('default', { month: 'short' }),
      sales: sumTotal(mBills),
      profit: sumProfit(mBills)
    }
  })

  const lowStock = products.filter(p => p.quantity <= (p.lowStockAt || 5))

  return {
    todaySales: sumTotal(todayBills),
    monthlySales: sumTotal(monthBills),
    yearlySales: sumTotal(yearBills),
    todayOrders: todayBills.length,
    monthlyOrders: monthBills.length,
    totalProfit: sumProfit(monthBills),
    topSellers,
    lowStock,
    monthlyData,
    recentBills: bills.slice(0, 5)
  }
}           