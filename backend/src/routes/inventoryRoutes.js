import { Router } from 'express'
import { validateItem, getInventoryStats } from '../controllers/inventoryController.js'

const router = Router()

router.post('/validate', validateItem)
router.post('/stats', getInventoryStats)

export default router