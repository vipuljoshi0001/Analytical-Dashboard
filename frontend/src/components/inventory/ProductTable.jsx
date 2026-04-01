import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import Badge from '../ui/Badge'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'

export default function ProductTable({ products, onEdit, onDelete }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const thClass = `text-xs uppercase tracking-wide font-medium px-4 py-3 text-left ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`
  const trClass = `border-t text-sm transition-colors ${theme === 'dark' ? 'border-white/5 hover:bg-white/3' : 'border-slate-100 hover:bg-indigo-50/30'}`

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className={theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}>
          <tr>
            {['Product', 'Category', 'Cost ₹', 'Selling ₹', 'GST', 'Stock', 'Profit %', 'Actions'].map(h => (
              <th key={h} className={thClass}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {products.map((p, i) => {
              const profit = p.costPrice > 0 ? ((p.sellingPrice - p.costPrice) / p.costPrice * 100).toFixed(1) : '0'
              const stockStatus = p.quantity === 0 ? 'danger' : p.quantity <= (p.lowStockAt || 5) ? 'warning' : 'success'
              const stockLabel = p.quantity === 0 ? 'Out' : p.quantity <= (p.lowStockAt || 5) ? 'Low' : 'OK'
              return (
                <motion.tr key={p.itemId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.02 }}
                  className={trClass}
                >
                  <td className={`px-4 py-3.5 font-medium ${textPrimary}`}>{p.name}</td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>{p.category}</td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>₹{p.costPrice}</td>
                  <td className="px-4 py-3.5 text-indigo-400 font-semibold">₹{p.sellingPrice}</td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>{p.gstPercent}%</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={textPrimary}>{p.quantity}</span>
                      <Badge variant={stockStatus}>{stockLabel}</Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={Number(profit) >= 20 ? 'text-green-400' : Number(profit) >= 0 ? 'text-amber-400' : 'text-red-400'}>
                      {profit}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => onEdit(p)} className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                        <RiEditLine className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(p.itemId)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </AnimatePresence>
          {!products.length && (
            <tr><td colSpan={8} className={`text-center py-12 ${textSecondary}`}>No products found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}