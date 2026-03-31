import { useState, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { subscribeProducts } from '../services/inventoryService'
import { createBill } from '../services/billingService'
import { generateBillPDF } from '../utils/generateBill'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { RiAddLine, RiSubtractLine, RiDeleteBinLine, RiPrinterLine } from 'react-icons/ri'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function BillingPage() {
  const { user, shopData } = useAuth()
  const { cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartSubtotal, cartGST } = useCart()
  const { t } = useLang()
  const { theme } = useTheme()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMode, setPaymentMode] = useState('Cash')
  const [loading, setLoading] = useState(false)
  const [billDone, setBillDone] = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    return subscribeProducts(user.uid, setProducts)
  }, [user])

  const filtered = products.filter(p =>
    p.quantity > 0 &&
    (p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()))
  )

  const handleCheckout = async () => {
    if (!customerName || !customerPhone) return toast.error('Please fill customer details')
    setLoading(true)
    try {
      const shopSnap = await getDoc(doc(db, 'shops', user.uid))
      const shop = shopSnap.data()
      const billNumber = (shop.billCounter || 0) + 1

      const billData = {
        billNumber,
        customerName,
        customerPhone,
        paymentMode,
        subtotal: cartSubtotal,
        gstAmount: cartGST,
        totalAmount: cartTotal,
        createdAt: new Date().toISOString()
      }

      await createBill(user.uid, billData, cart, products)
      generateBillPDF({ ...shopData }, billData, cart)

      setBillDone(billData)
      clearCart()
      setShowCheckout(false)
      setCustomerName('')
      setCustomerPhone('')
      toast.success(`Bill #${billNumber} generated!`)
    } catch (err) {
      toast.error('Billing failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>{t('billing.title')}</h1>
          <p className={textSecondary}>{cart.length} items in cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Grid */}
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-5">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
              {filtered.map((p, i) => {
                const inCart = cart.find(c => c.itemId === p.itemId)
                return (
                  <motion.div
                    key={p.itemId}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => addToCart(p)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      inCart
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : theme === 'dark'
                          ? 'border-white/5 bg-white/3 hover:border-indigo-500/50 hover:bg-indigo-500/5'
                          : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg"
                      style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))' }}>
                      👕
                    </div>
                    <p className={`text-sm font-semibold truncate ${textPrimary}`}>{p.name}</p>
                    <p className={`text-xs ${textSecondary} mb-2`}>{p.category}</p>
                    <p className="text-indigo-400 font-bold">₹{p.sellingPrice}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${textSecondary}`}>Qty: {p.quantity}</span>
                      {inCart && <Badge variant="info">×{inCart.qty}</Badge>}
                    </div>
                  </motion.div>
                )
              })}
              {!filtered.length && (
                <div className={`col-span-3 text-center py-12 ${textSecondary}`}>
                  No products available
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Cart Panel */}
        <div>
          <Card className="sticky top-8">
            <h2 className={`text-base font-semibold ${textPrimary} mb-4`}>{t('billing.cart')}</h2>

            {cart.length === 0 ? (
              <div className={`text-center py-8 ${textSecondary}`}>
                <div className="text-4xl mb-3">🛒</div>
                <p className="text-sm">Cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-4">
                  {cart.map(item => (
                    <div key={item.itemId} className={`flex items-center gap-3 p-3 rounded-xl ${
                      theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'
                    }`}>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${textPrimary}`}>{item.name}</p>
                        <p className="text-indigo-400 text-xs">₹{item.sellingPrice}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.itemId, item.qty - 1)}
                          className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-indigo-500/20 text-white transition-colors">
                          <RiSubtractLine className="w-3 h-3" />
                        </button>
                        <span className={`text-sm font-bold w-5 text-center ${textPrimary}`}>{item.qty}</span>
                        <button onClick={() => updateQty(item.itemId, item.qty + 1)}
                          className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center hover:bg-indigo-500/20 text-white transition-colors">
                          <RiAddLine className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.itemId)}
                          className="w-6 h-6 rounded-lg text-red-400 hover:bg-red-500/10 flex items-center justify-center ml-1 transition-colors">
                          <RiDeleteBinLine className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className={`rounded-xl p-4 mb-4 space-y-2 ${theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}`}>
                  <div className="flex justify-between text-sm">
                    <span className={textSecondary}>{t('billing.subtotal')}</span>
                    <span className={textPrimary}>₹{cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={textSecondary}>{t('billing.gstAmount')}</span>
                    <span className="text-amber-400">₹{cartGST.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between font-bold pt-2 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                    <span className={textPrimary}>{t('billing.total')}</span>
                    <span className="text-indigo-400 text-lg">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={() => setShowCheckout(true)} className="w-full justify-center" icon={<RiPrinterLine />}>
                  {t('billing.proceedToPay')}
                </Button>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-3xl p-6 w-full max-w-md"
            >
              <h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Customer Details</h2>
              <div className="space-y-4">
                <Input label={t('billing.customerName')} value={customerName}
                  onChange={e => setCustomerName(e.target.value)} placeholder="Rahul Sharma" />
                <Input label={t('billing.customerPhone')} type="tel" value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)} placeholder="9876543210" />
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>{t('billing.paymentMode')}</label>
                  <div className="flex gap-3">
                    {['Cash', 'UPI', 'Card'].map(mode => (
                      <button
                        key={mode}
                        onClick={() => setPaymentMode(mode)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          paymentMode === mode
                            ? 'bg-indigo-500 text-white'
                            : theme === 'dark' ? 'bg-white/5 text-slate-400 hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}`}>
                  <div className="flex justify-between font-bold text-lg">
                    <span className={textPrimary}>Total</span>
                    <span className="text-indigo-400">₹{cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={handleCheckout} loading={loading} className="flex-1 justify-center" icon={<RiPrinterLine />}>
                  {t('billing.generateBill')}
                </Button>
                <Button variant="ghost" onClick={() => setShowCheckout(false)} className="flex-1 justify-center">
                  {t('common.cancel')}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {billDone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-3xl p-8 w-full max-w-sm text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-4xl">✅</span>
              </motion.div>
              <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Bill Generated!</h3>
              <p className={`${textSecondary} mb-1`}>Bill No: <span className="text-indigo-400 font-bold">#{billDone.billNumber}</span></p>
              <p className={`${textSecondary} mb-1`}>Customer: {billDone.customerName}</p>
              <p className={`text-2xl font-bold text-green-400 my-4`}>₹{billDone.totalAmount.toFixed(2)}</p>
              <p className="text-xs text-slate-500 mb-6">PDF downloaded automatically</p>
              <Button onClick={() => setBillDone(null)} className="w-full justify-center">
                New Bill
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}