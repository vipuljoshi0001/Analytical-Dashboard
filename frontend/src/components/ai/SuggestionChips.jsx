import { useTheme } from '../../context/ThemeContext'

export default function SuggestionChips({ suggestions, onSelect }) {
  const { theme } = useTheme()

  return (
    <div className="px-6 pb-3 flex flex-wrap gap-2">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            theme === 'dark'
              ? 'border-white/10 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/5'
              : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}