import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { subscribeProducts, addProduct, updateProduct, deleteProduct } from '../services/inventoryService'
import toast from 'react-hot-toast'

export const useInventory = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    const unsub = subscribeProducts(user.uid, (data) => {
      setProducts(data)
      setLoading(false)
    })
    return unsub
  }, [user])

  const add = async (data) => {
    try {
      await addProduct(user.uid, data)
      toast.success('Product added!')
    } catch {
      toast.error('Failed to add product')
    }
  }

  const update = async (id, data) => {
    try {
      await updateProduct(user.uid, id, data)
      toast.success('Product updated!')
    } catch {
      toast.error('Failed to update product')
    }
  }

  const remove = async (id) => {
    try {
      await deleteProduct(user.uid, id)
      toast.success('Product deleted!')
    } catch {
      toast.error('Failed to delete product')
    }
  }

  return { products, loading, add, update, remove }
}