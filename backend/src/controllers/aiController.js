import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const chatWithAI = async (req, res) => {
  const { message, shopContext } = req.body

  if (!message) return res.status(400).json({ error: 'Message is required' })

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are SellNiti AI, a smart business assistant for Indian small shop owners.
You have access to the following real-time shop data:
${shopContext || 'No data available yet.'}

Instructions:
- Give practical, actionable advice in simple language
- Use Indian context (₹, GST, festivals, seasons)
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for recommendations
- Be encouraging and business-focused
- If asked in Hindi, respond in Hindi`
        },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    res.json({ reply: completion.choices[0].message.content })
  } catch (err) {
    console.error('OpenAI error:', err)
    res.status(500).json({ error: 'AI service unavailable', reply: 'Sorry, AI is unavailable right now. Please try again.' })
  }
}