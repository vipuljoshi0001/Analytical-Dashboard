import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

export default function Card({ children, className = '', hover = true, glow = false, ...props }) {
  const { theme } = useTheme()

  return (
    <motion.div
      whileHover={hover ? { y: -2, scale: 1.005 } : {}}
      transition={{ duration: 0.2 }}
      className={`rounded-2xl p-6 ${hover ? 'card-hover' : ''} ${glow ? 'glow-primary' : ''} ${className}`}
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(145deg, rgba(20,20,40,0.9), rgba(15,15,30,0.8))'
          : 'rgba(255,255,255,0.9)',
        border: theme === 'dark'
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid rgba(0,0,0,0.06)',
        backdropFilter: 'blur(20px)'
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}