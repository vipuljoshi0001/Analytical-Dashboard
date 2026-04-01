export default function Spinner({ size = 'md', color = 'indigo' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  const colors = {
    indigo: 'border-indigo-500',
    white: 'border-white',
    slate: 'border-slate-400'
  }

  return (
    <div className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full animate-spin`} />
  )
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center animated-bg z-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-slate-400 text-sm mt-4">Loading SellNiti...</p>
      </div>
    </div>
  )
}