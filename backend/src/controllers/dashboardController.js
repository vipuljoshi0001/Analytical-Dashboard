export const getAnalyticsSummary = async (req, res) => {
  try {
    const { bills, products } = req.body
    if (!bills || !products) return res.status(400).json({ error: 'Bills and products required' })

    const totalRevenue = bills.reduce((s, b) => s + (b.totalAmount || 0), 0)
    const totalProfit = bills.reduce((s, b) => {
      const profit = (b.items || []).reduce((p, item) => {
        const prod = products.find(pr => pr.itemId === item.itemId)
        return p + ((item.sellingPrice - (prod?.costPrice || 0)) * item.qty)
      }, 0)
      return s + profit
    }, 0)

    res.json({
      totalRevenue,
      totalProfit,
      totalBills: bills.length,
      profitMargin: totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}