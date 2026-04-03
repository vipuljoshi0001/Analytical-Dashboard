import Groq from 'groq-sdk'

let groqClient = null

export const getGroqClient = () => {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not set in .env')
    }
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY })
  }
  return groqClient
}

export const buildSystemPrompt = (shopContext) => `
You are SellNiti AI, a smart business assistant for Indian small shop owners.
Shop Data: ${shopContext || 'No data yet.'}
Be practical, concise, and use Indian business context.
Reply in Hindi if user writes in Hindi.
`.trim()

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
Low Stock: ${dashData.lowStock?.map(s => `${s?.name} (${s?.quantity} left)`).filter(Boolean).join(', ') || 'All good'}
Yearly Sales: ₹${(dashData.yearlySales || 0).toLocaleString('en-IN')}
  `.trim()
}