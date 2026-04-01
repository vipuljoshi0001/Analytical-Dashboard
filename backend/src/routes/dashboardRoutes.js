import { Router } from 'express'
import { getAnalyticsSummary } from '../controllers/dashboardController.js'

const router = Router()

router.post('/summary', getAnalyticsSummary)

export default router