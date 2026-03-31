import { useState, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { getDashboardData } from '../services/dashboardService'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import Badge from '../components/ui/Badge'
import { RiArrowUpLine, RiArrowDownLine, RiShoppingBagLine, RiMoneyRupeeCircleLine, RiFileListLine, RiAlertLine } from 'react-icons/ri'

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe']

export default function DashboardPage() {
  const { shopData, user } = useAuth()
  const { t } = useLang()
  const { theme } = useTheme()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('monthly')

  useEffect(() => {
    if (user?.uid) {
      getDashboardData(user.uid).then(d => {
        setData(d)
        setLoading(false)
      })
    }
  }, [user])

  const kpis = data ? [
    { label: t('dashboard.todaySales'), value: `₹${data.todaySales.toLocaleString('en-IN')}`, change: '+12%', up: true, icon: RiMoneyRupeeCircleLine, color: 'from-indigo-500 to-purple-600' },
    { label: t('dashboard.monthlyGMV'), value: `₹${data.monthlySales.toLocaleString('en-IN')}`, change: '+8%', up: true, icon: RiShoppingBagLine, color: 'from-purple-500 to-pink-600' },
    { label: t('dashboard.totalOrders'), value: data.monthlyOrders, change: '+5%', up: true, icon: RiFileListLine, color: 'from-cyan-500 to-blue-600' },
    { label: t('dashboard.totalProfit'), value: `₹${data.totalProfit.toLocaleString('en-IN')}`, change: '+3%', up: true, icon: RiArrowUpLine, color: 'from-green-500 to-emerald-600' },
  ] : []

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
  const axisColor = theme === 'dark' ? '#475569' : '#94a3b8'
  const tooltipBg = theme === 'dark' ? '#1a1a35' : '#ffffff'

  if (loading) return (
    <PageWrapper>
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"/>
      </div>
    </PageWrapper>
  )

  return (
    <PageWrapper>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>
            {t('dashboard.title')} 👋
          </h1>
          <p className={`mt-1 ${textSecondary}`}>
            Welcome back, <span className="text-indigo-400 font-medium">{shopData?.shopName}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {['daily', 'monthly', 'yearly'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-indigo-500 text-white'
                  : theme === 'dark' ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map(({ label, value, change, up, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="relative overflow-hidden" hover>
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl -translate-y-6 translate-x-6`}/>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm ${textSecondary}`}>{label}</p>
                  <p className={`text-2xl font-bold mt-1 ${textPrimary} count-up`}>{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className={`flex items-center gap-1 mt-3 text-sm ${up ? 'text-green-400' : 'text-red-400'}`}>
                {up ? <RiArrowUpLine /> : <RiArrowDownLine />}
                {change} <span className={textSecondary}>vs last month</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Sales Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-base font-semibold ${textPrimary}`}>Monthly Sales & Profit</h2>
              <Badge variant="info">2025</Badge>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data?.monthlyData || []}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: tooltipBg, border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', color: theme === 'dark' ? '#fff' : '#0f172a' }}
                  formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} name="Sales" />
                <Bar dataKey="profit" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="Profit" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card>
            <h2 className={`text-base font-semibold ${textPrimary} mb-6`}>Top Categories</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data?.topSellers?.slice(0, 5).map(s => ({ name: s?.name || 'Unknown', value: s?.soldQty || 0 }))}
                  cx="50%" cy="45%"
                  innerRadius={55} outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data?.topSellers?.slice(0, 5).map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: tooltipBg, border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px' }} />
                <Legend formatter={(v) => <span style={{ color: axisColor, fontSize: '11px' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Sellers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <h2 className={`text-base font-semibold ${textPrimary} mb-4`}>{t('dashboard.topSellers')}</h2>
            <div className="space-y-3">
              {data?.topSellers?.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${COLORS[i % 5]}, ${COLORS[(i + 1) % 5]})` }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${textPrimary}`}>{item?.name || 'Unknown'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 rounded-full bg-indigo-500/20 flex-1">
                        <div className="h-full rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${Math.min(100, (item?.soldQty / (data.topSellers[0]?.soldQty || 1)) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                  <Badge variant="info">{item?.soldQty || 0} sold</Badge>
                </div>
              ))}
              {(!data?.topSellers?.length) && (
                <p className={`text-sm ${textSecondary}`}>No sales data yet</p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Low Stock */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <RiAlertLine className="text-amber-400 w-5 h-5" />
              <h2 className={`text-base font-semibold ${textPrimary}`}>{t('dashboard.lowStock')}</h2>
            </div>
            <div className="space-y-3">
              {data?.lowStock?.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${textPrimary}`}>{item.name}</p>
                    <p className={`text-xs ${textSecondary}`}>{item.category}</p>
                  </div>
                  <Badge variant={item.quantity === 0 ? 'danger' : 'warning'}>
                    {item.quantity === 0 ? 'Out of stock' : `${item.quantity} left`}
                  </Badge>
                </div>
              ))}
              {!data?.lowStock?.length && (
                <p className={`text-sm ${textSecondary}`}>All items well stocked!</p>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </PageWrapper>
  )
}