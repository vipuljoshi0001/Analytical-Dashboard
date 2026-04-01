import { useTheme } from '../../context/ThemeContext'

export default function DateRangeFilter({ value, onChange }) {
  const { theme } = useTheme()
  const filters = ['daily', 'monthly', 'yearly']

  return (
    <div className={`flex rounded-xl p-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
            value === f
              ? 'bg-indigo-500 text-white shadow-sm'
              : theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}