import { useLang } from '../../context/LanguageContext'
import { RiTranslate2 } from 'react-icons/ri'
import { motion } from 'framer-motion'

export default function LanguageToggle({ compact = false }) {
  const { lang, toggleLang } = useLang()
  const { theme } = { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLang}
      className={`flex items-center gap-2 rounded-xl font-medium transition-all ${
        compact ? 'p-2' : 'px-4 py-2 text-sm'
      } bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10`}
      title={lang === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
    >
      <RiTranslate2 className="w-4 h-4 text-indigo-400" />
      {!compact && (lang === 'en' ? 'हिंदी' : 'English')}
    </motion.button>
  )
}