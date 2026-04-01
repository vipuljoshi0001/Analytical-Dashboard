import { useTheme } from '../../context/ThemeContext'
import Card from '../ui/Card'
import { RiLightbulbLine } from 'react-icons/ri'

export default function AIInsightCard({ insight, type = 'tip' }) {
  const { theme } = useTheme()
  const colors = {
    tip: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
    warning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    success: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' }
  }
  const c = colors[type]

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border}`}>
      <RiLightbulbLine className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.text}`} />
      <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
        {insight}
      </p>
    </div>
  )
}