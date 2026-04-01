export const sortByProfit = (items) => {
  return [...items].sort((a, b) => {
    const profitA = a.sellingPrice - a.costPrice
    const profitB = b.sellingPrice - b.costPrice
    return profitB - profitA
  })
}

export const findLowStock = (items, threshold = 5) => {
  return items.filter(item => item.quantity <= threshold)
}

export const calculateInventoryValue = (items) => {
  return items.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0)
}