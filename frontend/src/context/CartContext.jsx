import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(c => c.itemId === item.itemId)
      if (exists) {
        return prev.map(c =>
          c.itemId === item.itemId
            ? { ...c, qty: Math.min(c.qty + 1, item.quantity) }
            : c
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(c => c.itemId !== itemId))
  }

  const updateQty = (itemId, qty) => {
    if (qty <= 0) return removeFromCart(itemId)
    setCart(prev => prev.map(c => c.itemId === itemId ? { ...c, qty } : c))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => {
    const gst = (item.sellingPrice * item.qty * item.gstPercent) / 100
    return sum + (item.sellingPrice * item.qty) + gst
  }, 0)

  const cartSubtotal = cart.reduce((s, i) => s + i.sellingPrice * i.qty, 0)

  const cartGST = cart.reduce((s, i) => s + (i.sellingPrice * i.qty * i.gstPercent) / 100, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartSubtotal, cartGST }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)