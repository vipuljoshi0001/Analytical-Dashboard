import express from 'express'
import cors from 'cors'
import { config, validateEnv } from './config/env.js'
import routes from './routes/index.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import { generalLimiter } from './middleware/rateLimiter.js'

validateEnv()

const app = express()

app.use(cors({
  origin: [config.frontendUrl, 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(generalLimiter)

app.get('/', (req, res) => res.json({
  name: 'SellNiti API',
  version: '1.0.0',
  status: 'running',
  docs: '/api/health'
}))

app.use('/api', routes)
app.use(notFound)
app.use(errorHandler)

export default app
