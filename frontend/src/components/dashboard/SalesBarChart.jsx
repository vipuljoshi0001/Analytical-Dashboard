import { useTheme } from '../../context/ThemeContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function SalesBarChart({ data = [] }) {
  const { theme } = useTheme()
  const axis = theme === 'dark' ? '#475569' : '#94a3b8'
  const grid = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  const tooltipBg = theme === 'dark' ? '#1a1a35' : '#ffffff'

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => v >= 1000 ? `₹${(v/1000).toFixed(0)}k` : `₹${v}`} />
        <Tooltip
          contentStyle={{ background: tooltipBg, border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: theme === 'dark' ? '#e2e8f0' : '#0f172a', fontSize: '12px' }}
          formatter={(v, name) => [`₹${v.toLocaleString('en-IN')}`, name]}
        />
        <Legend formatter={v => <span style={{ color: axis, fontSize: '11px' }}>{v}</span>} />
        <Bar dataKey="sales" name="Sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
        <Bar dataKey="profit" name="Profit" fill="#8b5cf6" radius={[6, 6, 0, 0]} opacity={0.75} />
      </BarChart>
    </ResponsiveContainer>
  )
}