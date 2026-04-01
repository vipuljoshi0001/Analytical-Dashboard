import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import Badge from '../ui/Badge'

export default function ItemSelectionGrid({ products, cart, onAdd, search }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  const filtered = products.filter(p =>
    p.quantity > 0 &&
    (p.name?.toLowerCase().includes(search.toLowerCase()) ||
     p.category?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
      {filtered.map((p, i) => {
        const inCart = cart.find(c => c.itemId === p.itemId)
        return (
          <motion.div
            key={p.itemId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => onAdd(p)}
            className={`p-4 rounded-2xl cursor-pointer transition-all border ${
              inCart
                ? 'border-indigo-500 bg-indigo-500/10'
                : theme === 'dark'
                  ? 'border-white/5 bg-white/3 hover:border-indigo-500/50 hover:bg-indigo-500/5'
                  : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))' }}>
              👕
            </div>
            <p className={`text-sm font-semibold truncate ${textPrimary}`}>{p.name}</p>
            <p className={`text-xs mb-2 ${textSecondary}`}>{p.category}</p>
            <p className="text-indigo-400 font-bold text-sm">₹{p.sellingPrice}</p>
            <div className="flex items-center justify-between mt-1.5">
              <span className={`text-xs ${textSecondary}`}>Qty: {p.quantity}</span>
              {inCart && <Badge variant="info">×{inCart.qty}</Badge>}
            </div>
          </motion.div>
        )
      })}
      {!filtered.length && (
        <div className={`col-span-3 text-center py-12 ${textSecondary}`}>No products available</div>
      )}
    </div>
  )
}