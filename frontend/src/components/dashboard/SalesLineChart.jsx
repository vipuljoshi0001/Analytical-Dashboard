import { useTheme } from '../../context/ThemeContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SalesLineChart({ data = [] }) {
  const { theme } = useTheme()
  const axis = theme === 'dark' ? '#475569' : '#94a3b8'
  const grid = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
  const tooltipBg = theme === 'dark' ? '#1a1a35' : '#ffffff'

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} />
        <XAxis dataKey="month" tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: axis, fontSize: 11 }} axisLine={false} tickLine={false}
          tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ background: tooltipBg, border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: theme === 'dark' ? '#e2e8f0' : '#0f172a', fontSize: '12px' }}
          formatter={v => [`₹${v.toLocaleString('en-IN')}`, 'Sales']}
        />
        <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2.5}
          dot={{ fill: '#6366f1', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, fill: '#8b5cf6' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}