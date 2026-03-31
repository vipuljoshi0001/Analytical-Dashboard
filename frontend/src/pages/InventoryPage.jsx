import { useState, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { subscribeProducts, addProduct, updateProduct, deleteProduct } from '../services/inventoryService'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiSearchLine, RiCloseLine } from 'react-icons/ri'

const CATEGORIES = ['T-Shirts', 'Jeans', 'Shirts', 'Jackets', 'Footwear', 'Accessories', 'Other']
const GST_RATES = [0, 5, 12, 18, 28]

const emptyForm = { name: '', category: 'T-Shirts', costPrice: '', sellingPrice: '', quantity: '', gstPercent: 12, lowStockAt: 5 }

export default function InventoryPage() {
  const { user } = useAuth()
  const { t } = useLang()
  const { theme } = useTheme()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    const unsub = subscribeProducts(user.uid, setProducts)
    return unsub
  }, [user])

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setForm(emptyForm); setEditItem(null); setShowModal(true) }
  const openEdit = (item) => { setForm({ ...item }); setEditItem(item); setShowModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = {
        ...form,
        costPrice: Number(form.costPrice),
        sellingPrice: Number(form.sellingPrice),
        quantity: Number(form.quantity),
        gstPercent: Number(form.gstPercent),
        lowStockAt: Number(form.lowStockAt)
      }
      if (editItem) {
        await updateProduct(user.uid, editItem.itemId, data)
        toast.success('Product updated!')
      } else {
        await addProduct(user.uid, data)
        toast.success('Product added!')
      }
      setShowModal(false)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProduct(user.uid, id)
      toast.success('Product deleted')
      setDeleteId(null)
    } catch {
      toast.error('Delete failed')
    }
  }

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const tableHeader = theme === 'dark' ? 'text-slate-400 bg-white/3' : 'text-slate-500 bg-slate-50'
  const tableRow = theme === 'dark' ? 'border-white/5 hover:bg-white/3' : 'border-slate-100 hover:bg-indigo-50/30'

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>{t('inventory.title')}</h1>
          <p className={textSecondary}>{products.length} products total</p>
        </div>
        <Button onClick={openAdd} icon={<RiAddLine className="w-4 h-4" />}>
          {t('inventory.addProduct')}
        </Button>
      </div>

      <Card>
        {/* Search */}
        <div className="mb-5">
          <Input
            placeholder={t('inventory.searchProducts')}
            icon={<RiSearchLine className="w-4 h-4" />}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-xs uppercase tracking-wide ${tableHeader}`}>
                {['Product', 'Category', 'Cost', 'Selling', 'GST', 'Stock', 'Profit%', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filtered.map((p, i) => {
                  const profit = ((p.sellingPrice - p.costPrice) / p.costPrice * 100).toFixed(1)
                  const stockStatus = p.quantity === 0 ? 'danger' : p.quantity <= p.lowStockAt ? 'warning' : 'success'
                  const stockLabel = p.quantity === 0 ? t('inventory.outOfStock') : p.quantity <= p.lowStockAt ? t('inventory.lowStockAlert') : t('inventory.inStock')
                  return (
                    <motion.tr
                      key={p.itemId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.03 }}
                      className={`border-t text-sm ${tableRow} transition-colors`}
                    >
                      <td className={`px-4 py-3.5 font-medium ${textPrimary}`}>{p.name}</td>
                      <td className={`px-4 py-3.5 ${textSecondary}`}>{p.category}</td>
                      <td className={`px-4 py-3.5 ${textSecondary}`}>₹{p.costPrice}</td>
                      <td className={`px-4 py-3.5 text-indigo-400 font-semibold`}>₹{p.sellingPrice}</td>
                      <td className={`px-4 py-3.5 ${textSecondary}`}>{p.gstPercent}%</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={textPrimary}>{p.quantity}</span>
                          <Badge variant={stockStatus}>{stockLabel}</Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={Number(profit) > 20 ? 'text-green-400' : 'text-amber-400'}>
                          {profit}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEdit(p)}
                            className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-500/10 transition-colors">
                            <RiEditLine className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeleteId(p.itemId)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                            <RiDeleteBinLine className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
              {!filtered.length && (
                <tr><td colSpan={8} className={`text-center py-12 ${textSecondary}`}>{t('common.noData')}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg glass rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${textPrimary}`}>
                  {editItem ? t('inventory.editProduct') : t('inventory.addProduct')}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                  <RiCloseLine className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Input label={t('inventory.productName')} value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('inventory.category')}
                    </label>
                    <select
                      value={form.category}
                      onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                        theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      {t('inventory.gst')}
                    </label>
                    <select
                      value={form.gstPercent}
                      onChange={e => setForm(p => ({ ...p, gstPercent: Number(e.target.value) }))}
                      className={`w-full rounded-xl px-4 py-3 text-sm outline-none ${
                        theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-800'
                      }`}
                    >
                      {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                    </select>
                  </div>
                  <Input label={t('inventory.costPrice')} type="number" value={form.costPrice}
                    onChange={e => setForm(p => ({ ...p, costPrice: e.target.value }))} required />
                  <Input label={t('inventory.sellingPrice')} type="number" value={form.sellingPrice}
                    onChange={e => setForm(p => ({ ...p, sellingPrice: e.target.value }))} required />
                  <Input label={t('inventory.quantity')} type="number" value={form.quantity}
                    onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} required />
                  <Input label="Low Stock Alert At" type="number" value={form.lowStockAt}
                    onChange={e => setForm(p => ({ ...p, lowStockAt: e.target.value }))} />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" loading={loading} className="flex-1 justify-center">
                    {editItem ? t('common.save') : t('inventory.addProduct')}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowModal(false)} className="flex-1 justify-center">
                    {t('common.cancel')}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <RiDeleteBinLine className="w-8 h-8 text-red-400" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>Delete Product?</h3>
              <p className={`${textSecondary} text-sm mb-6`}>This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button variant="danger" onClick={() => handleDelete(deleteId)} className="flex-1 justify-center">Delete</Button>
                <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1 justify-center">Cancel</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}