import { useTheme } from '../../context/ThemeContext'
import { PAYMENT_MODES, PAYMENT_ICONS } from '../../constants/paymentModes'

export default function PaymentModeSelector({ value, onChange }) {
  const { theme } = useTheme()
  return (
    <div>
      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
        Payment Mode
      </label>
      <div className="grid grid-cols-2 gap-2">
        {PAYMENT_MODES.map(mode => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
              value === mode
                ? 'bg-indigo-500 text-white ring-2 ring-indigo-400'
                : theme === 'dark'
                  ? 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>{PAYMENT_ICONS[mode]}</span>
            {mode}
          </button>
        ))}
      </div>
    </div>
  )
}