import Sidebar from './Sidebar'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

export default function PageWrapper({ children }) {
  const { theme } = useTheme()

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'animated-bg' : 'bg-slate-50'}`}>
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}