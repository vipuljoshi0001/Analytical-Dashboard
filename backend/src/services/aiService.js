import OpenAI from 'openai'

let openai = null

const getClient = () => {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not configured')
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return openai
}

export const getChatCompletion = async (message, systemPrompt) => {
  const client = getClient()
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ],
    max_tokens: 500,
    temperature: 0.7
  })
  return completion.choices[0].message.content
}

export const buildSystemPrompt = (shopContext) => `
You are SellNiti AI, a smart business assistant for Indian small shop owners.
You have access to real-time shop data:
${shopContext}

Instructions:
- Give practical, actionable advice in simple language
- Use Indian context (₹, GST, Diwali, seasons, local market trends)
- Keep responses concise (2-4 short paragraphs or bullet points)
- Be encouraging and business-focused
- If asked in Hindi, respond in Hindi
- Focus on actionable recommendations, not just analysis
`