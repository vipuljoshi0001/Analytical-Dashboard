import { useTheme } from '../../context/ThemeContext'
import CartItem from './CartItem'
import GSTSummary from './GSTSummary'
import Button from '../ui/Button'
import { RiPrinterLine, RiShoppingCart2Line } from 'react-icons/ri'

export default function CartPanel({ cart, onUpdateQty, onRemove, subtotal, gstAmount, total, onCheckout }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <div className="flex flex-col h-full">
      <h2 className={`text-base font-semibold mb-4 ${textPrimary}`}>Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <div className={`flex-1 flex flex-col items-center justify-center text-center ${textSecondary}`}>
          <RiShoppingCart2Line className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">Cart is empty</p>
          <p className="text-xs mt-1 opacity-60">Click items to add</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-1">
            {cart.map(item => (
              <CartItem
                key={item.itemId}
                item={item}
                onUpdateQty={onUpdateQty}
                onRemove={onRemove}
              />
            ))}
          </div>
          <GSTSummary subtotal={subtotal} gstAmount={gstAmount} total={total} />
          <Button onClick={onCheckout} className="w-full justify-center mt-4" icon={<RiPrinterLine className="w-4 h-4" />}>
            Proceed to Pay
          </Button>
        </>
      )}
    </div>
  )
}