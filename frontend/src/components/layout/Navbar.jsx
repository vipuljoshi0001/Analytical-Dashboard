import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../common/ThemeToggle'
import LanguageToggle from '../common/LanguageToggle'
import { RiBellLine } from 'react-icons/ri'

export default function Navbar({ title }) {
  const { theme } = useTheme()
  const { shopData } = useAuth()

  return (
    <div className={`flex items-center justify-between px-8 py-4 border-b ${
      theme === 'dark' ? 'border-white/5 bg-transparent' : 'border-slate-100 bg-white/80'
    } backdrop-blur-sm sticky top-0 z-40`}>
      <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageToggle />
        <button className={`p-2 rounded-xl transition-all ${
          theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
        }`}>
          <RiBellLine className="w-5 h-5" />
        </button>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${
          theme === 'dark' ? 'bg-white/5 border border-white/5' : 'bg-slate-50 border border-slate-100'
        }`}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            {shopData?.shopName?.[0] || 'S'}
          </div>
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {shopData?.shopName || 'Shop'}
          </span>
        </div>
      </div>
    </div>
  )
}