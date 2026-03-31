import { Router } from 'express'
import { chatWithAI } from '../controllers/aiController.js'
import rateLimit from 'express-rate-limit'

const router = Router()
const limiter = rateLimit({ windowMs: 60 * 1000, max: 20, message: { error: 'Too many requests' } })

router.post('/chat', limiter, chatWithAI)

export default router