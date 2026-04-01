import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri'

export default function KPICard({ label, value, change, up, icon: Icon, gradient, delay = 0 }) {
  const { theme } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative overflow-hidden rounded-2xl p-6 card-hover ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-dark-700 to-dark-800 border border-white/7'
          : 'bg-white border border-slate-100 shadow-sm'
      }`}
    >
      <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-2xl -translate-y-8 translate-x-8`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
          <p className={`text-2xl font-bold count-up ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {change && (
        <div className={`flex items-center gap-1 mt-3 text-sm ${up ? 'text-green-400' : 'text-red-400'}`}>
          {up ? <RiArrowUpLine /> : <RiArrowDownLine />}
          <span>{change}</span>
          <span className={`ml-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>vs last month</span>
        </div>
      )}
    </motion.div>
  )
}