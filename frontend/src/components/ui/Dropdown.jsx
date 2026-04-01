import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { RiArrowDownSLine } from 'react-icons/ri'

export default function Dropdown({ label, options, value, onChange, placeholder = 'Select...' }) {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find(o => (o.value || o) === value)
  const displayLabel = selected ? (selected.label || selected) : placeholder

  return (
    <div ref={ref} className="relative w-full">
      {label && (
        <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${
          theme === 'dark'
            ? 'bg-white/5 border border-white/10 text-white hover:border-indigo-500/50'
            : 'bg-white border border-slate-200 text-slate-800 hover:border-indigo-400'
        }`}
      >
        <span>{displayLabel}</span>
        <RiArrowDownSLine className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-50 shadow-xl ${
              theme === 'dark' ? 'bg-dark-700 border border-white/10' : 'bg-white border border-slate-200'
            }`}
          >
            {options.map((opt, i) => {
              const val = opt.value || opt
              const lbl = opt.label || opt
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { onChange(val); setOpen(false) }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    val === value
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : theme === 'dark'
                        ? 'text-slate-300 hover:bg-white/5'
                        : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lbl}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}