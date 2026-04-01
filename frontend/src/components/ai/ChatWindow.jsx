import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import { useTheme } from '../../context/ThemeContext'

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      <AnimatePresence initial={false}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
      </AnimatePresence>
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
          <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
            <div className="flex gap-1.5">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}