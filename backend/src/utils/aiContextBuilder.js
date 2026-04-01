export const buildAIContext = (shopData, analyticsData) => {
  if (!analyticsData) return 'No business data available yet.'

  return `
SHOP INFORMATION:
- Name: ${shopData?.shopName || 'Unknown'}
- GST: ${shopData?.gstNumber || 'Not set'}
- Phone: ${shopData?.phone || 'Not set'}

CURRENT PERFORMANCE:
- Today's Sales: ₹${analyticsData.todaySales || 0}
- This Month Sales: ₹${analyticsData.monthlySales || 0}
- This Year Sales: ₹${analyticsData.yearlySales || 0}
- Monthly Profit: ₹${analyticsData.totalProfit || 0}
- Monthly Orders: ${analyticsData.monthlyOrders || 0}

INVENTORY INSIGHTS:
- Top Sellers: ${analyticsData.topSellers?.map(s => s?.name).filter(Boolean).join(', ') || 'No data'}
- Low Stock Items: ${analyticsData.lowStock?.map(s => s?.name).filter(Boolean).join(', ') || 'None'}
  `.trim()
}