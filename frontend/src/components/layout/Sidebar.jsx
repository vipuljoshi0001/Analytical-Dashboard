import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
import {
  RiDashboardLine, RiStore2Line, RiFileList3Line,
  RiHistoryLine, RiRobotLine, RiUserLine,
  RiLogoutBoxLine, RiSunLine, RiMoonLine,
  RiTranslate2
} from 'react-icons/ri'

const navItems = [
  { to: '/', icon: RiDashboardLine, key: 'nav.dashboard' },
  { to: '/inventory', icon: RiStore2Line, key: 'nav.inventory' },
  { to: '/billing', icon: RiFileList3Line, key: 'nav.billing' },
  { to: '/history', icon: RiHistoryLine, key: 'nav.history' },
  { to: '/ai', icon: RiRobotLine, key: 'nav.ai' },
  { to: '/profile', icon: RiUserLine, key: 'nav.profile' },
]

export default function Sidebar() {
  const { shopData, logout } = useAuth()
  const { t, lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(180deg, rgba(10,10,20,0.98) 0%, rgba(15,15,30,0.98) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
        borderRight: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            S
          </div>
          <div>
            <p className="font-bold text-base gradient-text">SellNiti</p>
            <p className="text-xs opacity-50 truncate max-w-[120px]">{shopData?.shopName || 'Loading...'}</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, key }, i) => (
          <motion.div
            key={to}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'nav-active text-indigo-400'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:bg-white/5 hover:text-white'
                      : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{t(key)}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 space-y-2 border-t border-white/5">
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              theme === 'dark'
                ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {theme === 'dark' ? <RiSunLine className="w-4 h-4" /> : <RiMoonLine className="w-4 h-4" />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            onClick={toggleLang}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              theme === 'dark'
                ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <RiTranslate2 className="w-4 h-4" />
            {lang === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
        >
          <RiLogoutBoxLine className="w-5 h-5" />
          {t('nav.logout')}
        </button>
      </div>
    </motion.aside>
  )
}