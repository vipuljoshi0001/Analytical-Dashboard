import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine } from 'react-icons/ri'
import { useTheme } from '../../context/ThemeContext'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const { theme } = useTheme()
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
            className={`w-full ${sizes[size]} rounded-3xl p-6 ${
              theme === 'dark'
                ? 'bg-dark-700 border border-white/10'
                : 'bg-white border border-slate-200'
            }`}
            style={{ backdropFilter: 'blur(20px)' }}
          >
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded-lg transition-colors ${
                    theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <RiCloseLine className="w-5 h-5" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}