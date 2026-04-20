export const ShopSchema = {
  shopId: 'string',       
  shopName: 'string',
  gstNumber: 'string',   
  phone: 'string',
  email: 'string',
  billCounter: 'number',   
  createdAt: 'ISO string'
}

export const validateShop = (data) => {
  const required = ['shopName', 'gstNumber', 'phone', 'email']
  return required.every(key => data[key] && data[key].toString().trim() !== '')
}
