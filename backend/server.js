import dotenv from 'dotenv'
dotenv.config()

import app from './src/app.js'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ SellNiti backend running on port ${PORT}`)
  console.log(`🤖 AI Provider: Groq (llama-3.1-8b-instant)`)
  console.log(`🔑 Groq Key: ${process.env.GROQ_API_KEY ? 'FOUND ✅' : 'MISSING ❌'}`)
})
