import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import aiRoutes from './src/routes/aiRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.get('/', (req, res) => res.json({ status: 'SellNiti Backend Running' }))
app.use('/api/ai', aiRoutes)

app.listen(PORT, () => console.log(`SellNiti backend running on port ${PORT}`))