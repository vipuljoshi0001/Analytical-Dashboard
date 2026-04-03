import Groq from 'groq-sdk'

let groqClient = null

const getGroq = () => {
  if (!groqClient) {
    const key = process.env.GROQ_API_KEY
    if (!key) throw new Error('GROQ_API_KEY missing in .env')
    groqClient = new Groq({ apiKey: key })
  }
  return groqClient
}

export const chatWithAI = async (req, res) => {
  const { message, shopContext } = req.body
  if (!message?.trim()) return res.status(400).json({ error: 'Message required' })

  try {
    const groq = getGroq()
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are SellNiti AI, a smart business assistant for Indian small shop owners.
Shop Data: ${shopContext || 'No data yet.'}
- Give practical advice in simple language
- Use Indian context rupees GST festivals
- Be concise under 200 words
- Use bullet points
- If user writes in Hindi reply in Hindi`
        },
        { role: 'user', content: message.trim() }
      ],
      max_tokens: 400,
      temperature: 0.7
    })

    const reply = completion.choices[0]?.message?.content
    if (!reply) throw new Error('Empty response')
    res.json({ reply, provider: 'groq' })

  } catch (err) {
    console.error('[Groq Error]', err?.message)
    res.status(500).json({ reply: 'AI temporarily unavailable. Please try again.' })
  }
}
