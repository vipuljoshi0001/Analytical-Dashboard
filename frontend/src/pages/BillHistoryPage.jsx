import { useState, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { subscribeBills } from '../services/billingService'
import { generateBillPDF } from '../utils/generateBill'
import { motion } from 'framer-motion'
import { RiDownloadLine, RiSearchLine } from 'react-icons/ri'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function BillHistoryPage() {
  const { user, shopData } = useAuth()
  const { theme } = useTheme()
  const [bills, setBills] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user?.uid) return
    return subscribeBills(user.uid, setBills)
  }, [user])

  const filtered = bills.filter(b =>
    b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
    String(b.billNumber).includes(search)
  )

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const tableRow = theme === 'dark' ? 'border-white/5 hover:bg-white/3' : 'border-slate-100 hover:bg-slate-50'

  const modeColor = { 'Cash': 'success', 'UPI': 'info', 'Card': 'ghost' }

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>Bill History</h1>
          <p className={textSecondary}>{bills.length} total bills</p>
        </div>
      </div>

      <Card>
        <div className="mb-5">
          <Input placeholder="Search by customer or bill no..."
            icon={<RiSearchLine className="w-4 h-4" />}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-xs uppercase tracking-wide ${theme === 'dark' ? 'text-slate-400 bg-white/3' : 'text-slate-500 bg-slate-50'}`}>
                {['Bill No', 'Customer', 'Phone', 'Items', 'Subtotal', 'GST', 'Total', 'Mode', 'Date', 'PDF'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
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
                  <td className={`px-4 py-3.5 ${textSecondary}`}>₹{bill.subtotal?.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-amber-400">₹{bill.gstAmount?.toFixed(2)}</td>
                  <td className="px-4 py-3.5 text-green-400 font-bold">₹{bill.totalAmount?.toFixed(2)}</td>
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
                <tr><td colSpan={10} className={`text-center py-12 ${textSecondary}`}>No bills found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  )
}