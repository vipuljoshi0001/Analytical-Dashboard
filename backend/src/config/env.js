import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT || 5000,
  openaiKey: process.env.OPENAI_API_KEY,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development'
}

export const validateEnv = () => {
  if (!config.openaiKey) {
    console.warn('  OPENAI_API_KEY not set — AI features will be limited')
  }
  console.log(` Environment: ${config.nodeEnv}`)
}
