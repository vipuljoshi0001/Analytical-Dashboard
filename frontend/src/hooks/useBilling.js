import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { subscribeBills, createBill } from '../services/billingService'
import toast from 'react-hot-toast'

export const useBilling = () => {
  const { user } = useAuth()
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) return
    const unsub = subscribeBills(user.uid, (data) => {
      setBills(data)
      setLoading(false)
    })
    return unsub
  }, [user])

  const create = async (billData, cartItems, inventoryItems) => {
    try {
      await createBill(user.uid, billData, cartItems, inventoryItems)
      toast.success('Bill created!')
    } catch (err) {
      toast.error('Billing failed: ' + err.message)
      throw err
    }
  }

  return { bills, loading, create }
}