import { useTheme } from '../../context/ThemeContext'

export default function GSTSummary({ subtotal, gstAmount, total }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const divider = theme === 'dark' ? 'border-white/10' : 'border-slate-200'

  return (
    <div className={`rounded-xl p-4 space-y-2 ${theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}`}>
      <div className="flex justify-between text-sm">
        <span className={textSecondary}>Subtotal</span>
        <span className={textPrimary}>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className={textSecondary}>GST</span>
        <span className="text-amber-400">₹{gstAmount.toFixed(2)}</span>
      </div>
      <div className={`flex justify-between font-bold pt-2 border-t ${divider}`}>
        <span className={textPrimary}>Total</span>
        <span className="text-indigo-400 text-lg">₹{total.toFixed(2)}</span>
      </div>
    </div>
  )
}