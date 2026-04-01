import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useTheme } from '../../context/ThemeContext'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, productName }) {
  const { theme } = useTheme()
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <RiDeleteBinLine className="w-8 h-8 text-red-400" />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Delete Product?</h3>
        <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          "{productName}" will be permanently deleted.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={onConfirm} className="flex-1 justify-center">Delete</Button>
          <Button variant="ghost" onClick={onClose} className="flex-1 justify-center">Cancel</Button>
        </div>
      </div>
    </Modal>
  )
}