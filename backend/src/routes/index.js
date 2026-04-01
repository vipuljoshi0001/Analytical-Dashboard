import { Router } from 'express'
import aiRoutes from './aiRoutes.js'
import authRoutes from './authRoutes.js'
import billingRoutes from './billingRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import inventoryRoutes from './inventoryRoutes.js'
import shopRoutes from './shopRoutes.js'

const router = Router()

router.use('/ai', aiRoutes)
router.use('/auth', authRoutes)
router.use('/billing', billingRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/inventory', inventoryRoutes)
router.use('/shop', shopRoutes)

router.get('/health', (req, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
  service: 'SellNiti Backend'
}))

export default router