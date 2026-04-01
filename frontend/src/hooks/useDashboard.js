import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { getDashboardData } from '../services/dashboardService'

export const useDashboard = () => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = async () => {
    if (!user?.uid) return
    setLoading(true)
    try {
      const result = await getDashboardData(user.uid)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [user])

  return { data, loading, error, refresh }
}