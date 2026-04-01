import { useTheme } from '../../context/ThemeContext'
import Badge from '../ui/Badge'
import { RiAlertLine } from 'react-icons/ri'

export default function LowStockPanel({ items = [] }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  if (!items.length) return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="text-3xl mb-2">✅</span>
      <p className={`text-sm ${textSecondary}`}>All items well stocked!</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              item.quantity === 0 ? 'bg-red-500/15' : 'bg-amber-500/15'
            }`}>
              <RiAlertLine className={`w-4 h-4 ${item.quantity === 0 ? 'text-red-400' : 'text-amber-400'}`} />
            </div>
            <div>
              <p className={`text-sm font-medium ${textPrimary}`}>{item.name}</p>
              <p className={`text-xs ${textSecondary}`}>{item.category}</p>
            </div>
          </div>
          <Badge variant={item.quantity === 0 ? 'danger' : 'warning'}>
            {item.quantity === 0 ? 'Out of stock' : `${item.quantity} left`}
          </Badge>
        </div>
      ))}
    </div>
  )
}