import { Router } from 'express'
import { verifyToken, getShopInfo } from '../controllers/authController.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/verify', authLimiter, verifyToken)
router.get('/shop/:shopId', getShopInfo)

export default router