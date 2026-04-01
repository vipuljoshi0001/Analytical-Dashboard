import { Router } from 'express'
import { getShop, updateShop } from '../controllers/shopController.js'

const router = Router()

router.get('/:shopId', getShop)
router.put('/:shopId', updateShop)

export default router