import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Button from '../ui/Button'
import { RiSendPlane2Line } from 'react-icons/ri'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const { theme } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 px-6 py-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Ask me anything about your business..."
        disabled={disabled}
        className={`flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all ${
          theme === 'dark'
            ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500'
            : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-400'
        } disabled:opacity-50`}
      />
      <Button type="submit" disabled={!value.trim() || disabled} icon={<RiSendPlane2Line className="w-4 h-4" />}>
        Send
      </Button>
    </form>
  )
}