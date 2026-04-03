const AI_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:5000/api/ai/chat'

export const askAI = async (message, shopContext) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(AI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ message, shopContext })
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.reply || `HTTP ${response.status}`)
    }

    return response.json()
  } catch (err) {
    clearTimeout(timeout)
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw err
  }
}

export const buildShopContext = (shopData, dashData) => {
  if (!dashData) return 'No sales data available yet.'
  return `
Shop: ${shopData?.shopName || 'Unknown'}
GST: ${shopData?.gstNumber || 'Not set'}
Today Sales: ₹${(dashData.todaySales || 0).toLocaleString('en-IN')}
Monthly Sales: ₹${(dashData.monthlySales || 0).toLocaleString('en-IN')}
Monthly Profit: ₹${(dashData.totalProfit || 0).toLocaleString('en-IN')}
Monthly Orders: ${dashData.monthlyOrders || 0}
Top Sellers: ${dashData.topSellers?.map(s => s?.name).filter(Boolean).join(', ') || 'None yet'}
Low Stock: ${dashData.lowStock?.map(s => `${s?.name} (${s?.quantity} left)`).filter(Boolean).join(', ') || 'All stocked'}
  `.trim()
}