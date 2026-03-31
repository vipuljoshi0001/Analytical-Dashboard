import { useTheme } from '../../context/ThemeContext'

export default function Input({ label, error, icon, className = '', ...props }) {
  const { theme } = useTheme()

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 ${
            icon ? 'pl-10' : ''
          } ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-white/8'
              : 'bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
          } ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}