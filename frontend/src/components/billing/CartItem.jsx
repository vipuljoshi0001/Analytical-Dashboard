import { useTheme } from '../../context/ThemeContext'
import { RiAddLine, RiSubtractLine, RiDeleteBinLine } from 'react-icons/ri'

export default function CartItem({ item, onUpdateQty, onRemove }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const btnClass = `w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
    theme === 'dark' ? 'bg-white/10 hover:bg-indigo-500/20 text-white' : 'bg-slate-100 hover:bg-indigo-100 text-slate-600'
  }`

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}`}>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${textPrimary}`}>{item.name}</p>
        <p className="text-indigo-400 text-xs">₹{item.sellingPrice} × {item.qty}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={() => onUpdateQty(item.itemId, item.qty - 1)} className={btnClass}>
          <RiSubtractLine className="w-3 h-3" />
        </button>
        <span className={`text-sm font-bold w-5 text-center ${textPrimary}`}>{item.qty}</span>
        <button onClick={() => onUpdateQty(item.itemId, item.qty + 1)} className={btnClass}>
          <RiAddLine className="w-3 h-3" />
        </button>
        <button onClick={() => onRemove(item.itemId)} className="w-6 h-6 rounded-lg text-red-400 hover:bg-red-500/10 flex items-center justify-center ml-1 transition-colors">
          <RiDeleteBinLine className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}