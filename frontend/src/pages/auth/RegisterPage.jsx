import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { RiMailLine, RiLockLine, RiStoreLine, RiPhoneLine, RiFileTextLine } from 'react-icons/ri'

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: '', password: '', shopName: '', gstNumber: '', phone: ''
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(form.email, form.password, {
        shopName: form.shopName,
        gstNumber: form.gstNumber,
        phone: form.phone
      })
      toast.success('Shop registered successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { key: 'shopName', label: 'Shop Name', icon: <RiStoreLine className="w-4 h-4" />, placeholder: 'Raj Garments' },
    { key: 'gstNumber', label: 'GST Number', icon: <RiFileTextLine className="w-4 h-4" />, placeholder: '27AAPFU0939F1ZV' },
    { key: 'phone', label: 'Phone Number', icon: <RiPhoneLine className="w-4 h-4" />, placeholder: '9876543210', type: 'tel' },
    { key: 'email', label: 'Email', icon: <RiMailLine className="w-4 h-4" />, placeholder: 'shop@example.com', type: 'email' },
    { key: 'password', label: 'Password', icon: <RiLockLine className="w-4 h-4" />, placeholder: '••••••••', type: 'password' },
  ]

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float"/>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}/>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-3xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            S
          </div>
          <h1 className="text-2xl font-bold gradient-text">Create Your Shop</h1>
          <p className="text-slate-400 text-sm mt-1">Setup your SellNiti account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(f => (
            <Input
              key={f.key}
              label={f.label}
              type={f.type || 'text'}
              placeholder={f.placeholder}
              icon={f.icon}
              value={form[f.key]}
              onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              required
            />
          ))}
          <Button type="submit" loading={loading} className="w-full justify-center mt-2" size="lg">
            Register Shop
          </Button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Login</Link>
        </p>
      </motion.div>
    </div>
  )
}