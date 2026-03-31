import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen animated-bg flex items-center justify-center text-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-8xl font-black gradient-text mb-4">404</p>
        <p className="text-2xl font-bold text-white mb-2">Page not found</p>
        <p className="text-slate-400 mb-8">This page doesn't exist in SellNiti</p>
        <Link to="/"><Button>Go to Dashboard</Button></Link>
      </motion.div>
    </div>
  )
}