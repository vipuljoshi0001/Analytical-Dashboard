import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const { shopData } = useAuth()
  const { theme } = useTheme()
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  const fields = [
    { label: 'Shop Name', value: shopData?.shopName },
    { label: 'GST Number', value: shopData?.gstNumber },
    { label: 'Phone Number', value: shopData?.phone },
    { label: 'Email', value: shopData?.email },
    { label: 'Registered On', value: shopData?.createdAt ? new Date(shopData.createdAt).toLocaleDateString('en-IN') : '' },
  ]

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Shop Profile</h1>
        <p className={textSecondary}>Your business details</p>
      </div>
      <div className="max-w-xl">
        <Card>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              {shopData?.shopName?.[0] || 'S'}
            </div>
            <div>
              <p className={`text-xl font-bold ${textPrimary}`}>{shopData?.shopName}</p>
              <p className={`text-sm ${textSecondary}`}>GST: {shopData?.gstNumber}</p>
            </div>
          </div>
          <div className="space-y-4">
            {fields.map(({ label, value }) => (
              <motion.div key={label}
                className={`flex justify-between items-center py-3 border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
                <span className={`text-sm ${textSecondary}`}>{label}</span>
                <span className={`text-sm font-medium ${textPrimary}`}>{value || '—'}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}