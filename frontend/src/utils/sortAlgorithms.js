// Merge Sort — O(n log n) — for sorting inventory/sales
export const mergeSort = (arr, key, direction = 'asc') => {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid), key, direction)
  const right = mergeSort(arr.slice(mid), key, direction)
  return merge(left, right, key, direction)
}

const merge = (left, right, key, direction) => {
  const result = []
  let i = 0, j = 0
  while (i < left.length && j < right.length) {
    const a = left[i][key], b = right[j][key]
    const cond = direction === 'asc' ? a <= b : a >= b
    if (cond) result.push(left[i++])
    else result.push(right[j++])
  }
  return [...result, ...left.slice(i), ...right.slice(j)]
}

// Binary Search — O(log n) — for finding item in sorted inventory
export const binarySearch = (sortedArr, key, target) => {
  let low = 0, high = sortedArr.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const val = sortedArr[mid][key]
    if (val === target) return mid
    else if (val < target) low = mid + 1
    else high = mid - 1
  }
  return -1
}

// Greedy — rank items by profit margin
export const rankByProfit = (products) => {
  return [...products]
    .map(p => ({
      ...p,
      profitMargin: p.costPrice > 0
        ? ((p.sellingPrice - p.costPrice) / p.costPrice) * 100
        : 0
    }))
    .sort((a, b) => b.profitMargin - a.profitMargin)
}

// Aggregation — daily to monthly to yearly
export const aggregateSales = (bills, period = 'monthly') => {
  const grouped = {}
  bills.forEach(bill => {
    const date = new Date(bill.createdAt)
    let key
    if (period === 'daily') key = date.toLocaleDateString('en-IN')
    else if (period === 'monthly') key = `${date.getFullYear()}-${date.getMonth() + 1}`
    else key = `${date.getFullYear()}`
    grouped[key] = (grouped[key] || 0) + (bill.totalAmount || 0)
  })
  return grouped
}