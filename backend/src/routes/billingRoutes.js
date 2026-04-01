import { Router } from 'express'
import { validateBillData, calculateBillGST } from '../controllers/billingController.js'

const router = Router()

router.post('/validate', validateBillData)
router.post('/calculate-gst', calculateBillGST)

export default router