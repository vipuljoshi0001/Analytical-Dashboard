import { useTheme } from '../../context/ThemeContext'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e0e7ff']

export default function CategoryPieChart({ data = [] }) {
  const { theme } = useTheme()
  const tooltipBg = theme === 'dark' ? '#1a1a35' : '#ffffff'
  const axis = theme === 'dark' ? '#94a3b8' : '#64748b'

  const chartData = data.slice(0, 5).map(item => ({
    name: item?.name || 'Unknown',
    value: item?.soldQty || 0
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={chartData} cx="50%" cy="45%"
          innerRadius={55} outerRadius={80}
          paddingAngle={3} dataKey="value">
          {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip
          contentStyle={{ background: tooltipBg, border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', fontSize: '12px' }}
          formatter={(v, n) => [v + ' units', n]}
        />
        <Legend formatter={v => <span style={{ color: axis, fontSize: '11px' }}>{v}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}