import { useTheme } from '../../context/ThemeContext'
import { RiSunLine, RiMoonLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

export default function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`flex items-center gap-2 rounded-xl font-medium transition-all ${
        compact ? 'p-2' : 'px-4 py-2 text-sm'
      } ${
        isDark
          ? 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
      }`}
      title={isDark ? 'Switch to Light' : 'Switch to Dark'}
    >
      {isDark
        ? <RiSunLine className="w-4 h-4 text-amber-400" />
        : <RiMoonLine className="w-4 h-4 text-indigo-500" />
      }
      {!compact && (isDark ? 'Light' : 'Dark')}
    </motion.button>
  )
}