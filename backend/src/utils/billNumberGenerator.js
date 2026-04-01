export const generateBillNumber = (counter) => {
  return counter + 1
}

export const formatBillNumber = (num, prefix = 'SN') => {
  return `${prefix}${String(num).padStart(5, '0')}`
}

export const generateBillId = () => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BILL-${timestamp}-${random}`
}