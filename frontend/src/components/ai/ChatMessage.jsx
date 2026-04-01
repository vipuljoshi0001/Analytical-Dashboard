import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function ChatMessage({ message }) {
  const { theme } = useTheme()
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
          : theme === 'dark'
            ? 'bg-white/5 text-slate-200 rounded-bl-sm border border-white/5'
            : 'bg-slate-100 text-slate-700 rounded-bl-sm'
      }`}>
        {message.content}
      </div>
    </motion.div>
  )
}