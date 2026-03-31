const variants = {
  success: 'bg-green-500/15 text-green-400 border border-green-500/20',
  warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/20',
  info: 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20',
  ghost: 'bg-white/10 text-slate-300 border border-white/10',
}

export default function Badge({ children, variant = 'info', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}