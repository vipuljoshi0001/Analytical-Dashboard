import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { CATEGORIES } from '../../constants/categories'
import { GST_RATES } from '../../constants/gstRates'
import { useTheme } from '../../context/ThemeContext'

const empty = { name: '', category: 'T-Shirts', costPrice: '', sellingPrice: '', quantity: '', gstPercent: 12, lowStockAt: 5 }

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const labelClass = `block text-sm font-medium mb-1.5 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`
  const selectClass = `w-full rounded-xl px-4 py-3 text-sm outline-none transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-800'}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onAdd({
      name: form.name, category: form.category,
      costPrice: Number(form.costPrice), sellingPrice: Number(form.sellingPrice),
      quantity: Number(form.quantity), gstPercent: Number(form.gstPercent),
      lowStockAt: Number(form.lowStockAt)
    })
    setForm(empty)
    setLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Product" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input label="Product Name" value={form.name} onChange={e => set('name', e.target.value)} required placeholder="White Oversized Tee" />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className={selectClass}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>GST Rate</label>
            <select value={form.gstPercent} onChange={e => set('gstPercent', e.target.value)} className={selectClass}>
              {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
            </select>
          </div>
          <Input label="Cost Price (₹)" type="number" min="0" value={form.costPrice} onChange={e => set('costPrice', e.target.value)} required placeholder="200" />
          <Input label="Selling Price (₹)" type="number" min="0" value={form.sellingPrice} onChange={e => set('sellingPrice', e.target.value)} required placeholder="400" />
          <Input label="Quantity" type="number" min="0" value={form.quantity} onChange={e => set('quantity', e.target.value)} required placeholder="50" />
          <Input label="Low Stock Alert" type="number" min="0" value={form.lowStockAt} onChange={e => set('lowStockAt', e.target.value)} placeholder="5" />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={loading} className="flex-1 justify-center">Add Product</Button>
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1 justify-center">Cancel</Button>
        </div>
      </form>
    </Modal>
  )
}