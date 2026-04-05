import { useState, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { subscribeBills } from '../services/billingService'
import { generateBillPDF } from '../utils/generateBill'
import { motion } from 'framer-motion'
import { RiDownloadLine, RiSearchLine, RiCalendarLine, RiCloseLine, RiFilterLine } from 'react-icons/ri'
import Input from '../components/ui/Input'

export default function BillHistoryPage() {
  const { user, shopData } = useAuth()
  const { theme } = useTheme()
  const [bills, setBills] = useState([])
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filterMode, setFilterMode] = useState('all')

  useEffect(() => {
    if (!user?.uid) return
    return subscribeBills(user.uid, setBills)
  }, [user])

  // Quick filter buttons
  const applyQuickFilter = (mode) => {
    setFilterMode(mode)
    const today = new Date()
    const fmt = (d) => d.toISOString().split('T')[0]

    if (mode === 'today') {
      setStartDate(fmt(today))
      setEndDate(fmt(today))
    } else if (mode === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(today.getDate() - 7)
      setStartDate(fmt(weekAgo))
      setEndDate(fmt(today))
    } else if (mode === 'month') {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      setStartDate(fmt(monthStart))
      setEndDate(fmt(today))
    } else {
      setStartDate('')
      setEndDate('')
    }
  }

  const clearFilter = () => {
    setStartDate('')
    setEndDate('')
    setFilterMode('all')
  }

  // Filter logic
  const filtered = bills.filter(b => {
    const matchSearch =
      b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      String(b.billNumber).includes(search)

    if (!matchSearch) return false

    if (startDate || endDate) {
      const billDate = new Date(b.createdAt)
      billDate.setHours(0, 0, 0, 0)

      if (startDate) {
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        if (billDate < start) return false
      }
      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999)
        if (billDate > end) return false
      }
    }

    return true
  })

  const totalFiltered = filtered.reduce((s, b) => s + (b.totalAmount || 0), 0)

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const tableRow = theme === 'dark' ? 'border-white/5 hover:bg-white/3' : 'border-slate-100 hover:bg-slate-50'
  const thClass = `text-xs uppercase tracking-wide font-medium px-4 py-3 text-left ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`
  const inputClass = `rounded-xl px-3 py-2 text-sm outline-none transition-all ${
    theme === 'dark'
      ? 'bg-white/5 border border-white/10 text-white'
      : 'bg-white border border-slate-200 text-slate-800'
  }`
  const quickBtn = (mode) => `px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
    filterMode === mode
      ? 'bg-indigo-500 text-white'
      : theme === 'dark'
        ? 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10'
        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
  }`
  const modeColor = { Cash: 'success', UPI: 'info', Card: 'ghost', 'Net Banking': 'warning' }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>Bill History</h1>
          <p className={textSecondary}>
            {filtered.length} bills
            {(startDate || endDate) && (
              <span className="ml-2 text-indigo-400 font-medium">
                — filtered • Total: ₹{totalFiltered.toLocaleString('en-IN')}
              </span>
            )}
          </p>
        </div>
      </div>

      <Card>
        {/* Search + Filter Row */}
        <div className="space-y-4 mb-6">

          {/* Search */}
          <Input
            placeholder="Search by customer name or bill no..."
            icon={<RiSearchLine className="w-4 h-4" />}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <RiFilterLine className={`w-4 h-4 ${textSecondary}`} />
            <span className={`text-xs ${textSecondary}`}>Quick:</span>
            <button onClick={() => applyQuickFilter('all')} className={quickBtn('all')}>All</button>
            <button onClick={() => applyQuickFilter('today')} className={quickBtn('today')}>Today</button>
            <button onClick={() => applyQuickFilter('week')} className={quickBtn('week')}>This Week</button>
            <button onClick={() => applyQuickFilter('month')} className={quickBtn('month')}>This Month</button>
          </div>

          {/* Date Range Picker */}
          <div className="flex items-center gap-3 flex-wrap">
            <RiCalendarLine className={`w-4 h-4 flex-shrink-0 ${textSecondary}`} />
            <span className={`text-xs ${textSecondary}`}>Custom range:</span>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={e => { setStartDate(e.target.value); setFilterMode('custom') }}
                className={inputClass}
              />
              <span className={`text-sm ${textSecondary}`}>to</span>
              <input
                type="date"
                value={endDate}
                onChange={e => { setEndDate(e.target.value); setFilterMode('custom') }}
                className={inputClass}
              />
            </div>
            {(startDate || endDate) && (
              <button
                onClick={clearFilter}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all border border-red-500/20"
              >
                <RiCloseLine className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Active Filter Info */}
          {(startDate || endDate) && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
              theme === 'dark' ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200'
            }`}>
              <RiCalendarLine className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-400">
                Showing bills from{' '}
                <strong>{startDate ? new Date(startDate).toLocaleDateString('en-IN') : 'beginning'}</strong>
                {' '}to{' '}
                <strong>{endDate ? new Date(endDate).toLocaleDateString('en-IN') : 'today'}</strong>
                {' '}— {filtered.length} bills found
              </span>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}>
              <tr>
                {['Bill No', 'Customer', 'Phone', 'Items', 'Subtotal', 'GST', 'Total', 'Mode', 'Date', 'PDF'].map(h => (
                  <th key={h} className={thClass}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bill, i) => (
                <motion.tr
                  key={bill.billId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`border-t text-sm ${tableRow} transition-colors`}
                >
                  <td className="px-4 py-3.5">
                    <span className="text-indigo-400 font-bold">#{bill.billNumber}</span>
                  </td>
                  <td className={`px-4 py-3.5 font-medium ${textPrimary}`}>{bill.customerName}</td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>{bill.customerPhone}</td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>{bill.items?.length || 0}</td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>₹{(bill.subtotal || 0).toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-amber-400">₹{(bill.gstAmount || 0).toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-green-400 font-bold">₹{(bill.totalAmount || 0).toFixed(2)}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={modeColor[bill.paymentMode] || 'ghost'}>{bill.paymentMode}</Badge>
                  </td>
                  <td className={`px-4 py-3.5 ${textSecondary}`}>
                    {new Date(bill.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => generateBillPDF(shopData, bill, bill.items || [])}
                      className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors"
                    >
                      <RiDownloadLine className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={10} className={`text-center py-16 ${textSecondary}`}>
                    <RiCalendarLine className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No bills found</p>
                    <p className="text-xs mt-1 opacity-60">
                      {startDate || endDate ? 'Try a different date range' : 'No bills generated yet'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>

            {/* Footer Total Row */}
            {filtered.length > 0 && (
              <tfoot>
                <tr className={`border-t-2 ${theme === 'dark' ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                  <td colSpan={6} className={`px-4 py-3 text-sm font-medium ${textSecondary}`}>
                    Total ({filtered.length} bills)
                  </td>
                  <td className="px-4 py-3 text-green-400 font-bold text-sm">
                    ₹{totalFiltered.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </Card>
    </PageWrapper>
  )
}