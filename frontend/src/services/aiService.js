const AI_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:5000/api/ai/chat'

export const askAI = async (message, shopContext) => {
  const response = await fetch(AI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, shopContext })
  })
  if (!response.ok) throw new Error('AI request failed')
  return response.json()
}

export const buildShopContext = (shopData, dashData) => {
  if (!dashData) return 'No data available yet.'
  return `
Shop Name: ${shopData?.shopName}
GST Number: ${shopData?.gstNumber}
Today's Sales: ₹${dashData.todaySales || 0}
Monthly Sales: ₹${dashData.monthlySales || 0}
Monthly Profit: ₹${dashData.totalProfit || 0}
Total Orders This Month: ${dashData.monthlyOrders || 0}
Top Selling Products: ${dashData.topSellers?.map(s => s?.name).filter(Boolean).join(', ') || 'None'}
Low Stock Items: ${dashData.lowStock?.map(s => s?.name).filter(Boolean).join(', ') || 'None'}
Yearly Sales: ₹${dashData.yearlySales || 0}
  `.trim()
}