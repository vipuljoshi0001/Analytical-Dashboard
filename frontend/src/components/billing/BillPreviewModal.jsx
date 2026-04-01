import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { useTheme } from '../../context/ThemeContext'
import { RiDownloadLine, RiCheckLine } from 'react-icons/ri'
import { motion } from 'framer-motion'

export default function BillPreviewModal({ isOpen, onClose, billData, onNewBill }) {
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  if (!billData) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
        >
          <RiCheckLine className="w-10 h-10 text-green-400" />
        </motion.div>
        <h3 className={`text-2xl font-bold mb-1 ${textPrimary}`}>Bill Generated!</h3>
        <p className={`text-sm mb-4 ${textSecondary}`}>
          Bill <span className="text-indigo-400 font-bold">#{billData.billNumber}</span> for {billData.customerName}
        </p>
        <div className={`rounded-xl p-4 mb-6 ${theme === 'dark' ? 'bg-white/3' : 'bg-slate-50'}`}>
          <p className={`text-sm ${textSecondary}`}>Total Amount</p>
          <p className="text-3xl font-bold text-green-400 mt-1">₹{billData.totalAmount?.toFixed(2)}</p>
          <p className={`text-xs mt-1 ${textSecondary}`}>{billData.paymentMode} • PDF Downloaded</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onNewBill} className="flex-1 justify-center">New Bill</Button>
          <Button variant="secondary" onClick={onClose} className="flex-1 justify-center">
            <RiDownloadLine className="w-4 h-4 mr-1" /> History
          </Button>
        </div>
      </div>
    </Modal>
  )
}