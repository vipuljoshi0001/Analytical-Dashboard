import { useTheme } from '../../context/ThemeContext'
import Badge from '../ui/Badge'

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function TopSellersList({ items = [], maxSold = 1 }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  if (!items.length) return (
    <p className={`text-sm ${textSecondary}`}>No sales data yet</p>
  )

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${COLORS[i % 5]}, ${COLORS[(i + 1) % 5]})` }}>
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${textPrimary}`}>{item?.name || 'Unknown'}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className={`h-1.5 rounded-full flex-1 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>
                <div className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                  style={{ width: `${Math.min(100, ((item?.soldQty || 0) / (maxSold || 1)) * 100)}%` }} />
              </div>
            </div>
          </div>
          <Badge variant="info">{item?.soldQty || 0} sold</Badge>
        </div>
      ))}
    </div>
  )
}