import { useState } from 'react'

export const useAI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const ask = async (message, shopContext) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_AI_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, shopContext })
      })
      if (!res.ok) throw new Error('AI request failed')
      const data = await res.json()
      return data.reply
    } catch (err) {
      setError(err.message)
      return 'Sorry, AI is unavailable right now.'
    } finally {
      setLoading(false)
    }
  }

  return { ask, loading, error }
}