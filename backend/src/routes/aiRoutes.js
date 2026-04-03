import { Router } from 'express'
import { chatWithAI } from '../controllers/aiController.js'
import { aiLimiter } from '../middleware/rateLimiter.js'

const router = Router()

router.post('/chat', aiLimiter, chatWithAI)

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    provider: 'groq',
    model: 'llama-3.1-8b-instant',
    free: true
  })
})

export default router