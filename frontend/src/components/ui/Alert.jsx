import { motion, AnimatePresence } from 'framer-motion'
import { RiCheckLine, RiErrorWarningLine, RiInformationLine, RiCloseLine } from 'react-icons/ri'

const variants = {
  success: { bg: 'bg-green-500/15 border-green-500/30', text: 'text-green-400', icon: RiCheckLine },
  error: { bg: 'bg-red-500/15 border-red-500/30', text: 'text-red-400', icon: RiErrorWarningLine },
  warning: { bg: 'bg-amber-500/15 border-amber-500/30', text: 'text-amber-400', icon: RiErrorWarningLine },
  info: { bg: 'bg-indigo-500/15 border-indigo-500/30', text: 'text-indigo-400', icon: RiInformationLine }
}

export default function Alert({ type = 'info', message, onClose, show = true }) {
  const { bg, text, icon: Icon } = variants[type]

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`flex items-center gap-3 p-4 rounded-xl border ${bg} mb-4`}
        >
          <Icon className={`w-5 h-5 flex-shrink-0 ${text}`} />
          <p className={`flex-1 text-sm ${text}`}>{message}</p>
          {onClose && (
            <button onClick={onClose} className={`${text} hover:opacity-70`}>
              <RiCloseLine className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}