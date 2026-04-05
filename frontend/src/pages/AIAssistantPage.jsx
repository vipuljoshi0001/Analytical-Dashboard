import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { getDashboardData } from '../services/dashboardService'
import { buildShopContext } from '../services/aiService'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSendPlane2Line, RiRobotLine, RiTranslate2 } from 'react-icons/ri'

const LANGUAGES = [
  { value: 'english', label: 'English', flag: '🇬🇧' },
  { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
  { value: 'hinglish', label: 'Hinglish', flag: '🔀' },
]

const SUGGESTIONS = {
  english: [
    "Why are my sales low?",
    "Which product should I promote?",
    "What should I restock?",
    "How can I increase profit?",
    "Best marketing strategy?"
  ],
  hindi: [
    "मेरी बिक्री कम क्यों है?",
    "कौन सा प्रोडक्ट प्रमोट करूं?",
    "क्या रीस्टॉक करूं?",
    "मुनाफा कैसे बढ़ाएं?",
    "बेस्ट मार्केटिंग क्या है?"
  ],
  hinglish: [
    "Meri sales kam kyun hai?",
    "Kaun sa product promote karun?",
    "Kya restock karna chahiye?",
    "Profit kaise badhau?",
    "Best marketing strategy kya hai?"
  ]
}

// Format AI response — convert markdown to readable format
const formatMessage = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // remove bold **
    .replace(/\*(.*?)\*/g, '• $1')    // * to bullet
    .replace(/#{1,3} (.*)/g, '$1')    // remove headers
    .replace(/\n{3,}/g, '\n\n')       // max 2 newlines
    .trim()
}

const MessageBubble = ({ message, theme }) => {
  const isUser = message.role === 'user'
  const lines = message.content.split('\n').filter(l => l.trim())

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 mt-1"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          <RiRobotLine className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
          : theme === 'dark'
            ? 'bg-white/5 text-slate-200 rounded-bl-sm border border-white/5'
            : 'bg-slate-100 text-slate-700 rounded-bl-sm'
      }`}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="space-y-1.5">
            {lines.map((line, i) => {
              const isBullet = line.startsWith('•') || line.startsWith('-')
              const isNumbered = /^\d+\./.test(line)
              return (
                <div key={i} className={`${isBullet || isNumbered ? 'flex gap-2' : ''}`}>
                  {(isBullet || isNumbered) && (
                    <span className="text-indigo-400 flex-shrink-0 font-bold">
                      {isBullet ? '•' : line.match(/^\d+\./)[0]}
                    </span>
                  )}
                  <p className={isBullet ? '' : isNumbered ? '' : ''}>
                    {isBullet ? line.replace(/^[•-]\s*/, '') : isNumbered ? line.replace(/^\d+\.\s*/, '') : line}
                  </p>
                </div>
              )
            })}
          </div>
        )}
        <p className={`text-xs mt-1.5 ${isUser ? 'text-white/60' : theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          {new Date(message.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  )
}

export default function AIAssistantPage() {
  const { user, shopData } = useAuth()
  const { theme } = useTheme()
  const [aiLang, setAiLang] = useState('english')
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hello! I'm your AI business assistant for ${shopData?.shopName || 'your shop'}.\n\nAsk me anything about your sales, inventory, or business strategies!\n\n• Sales analysis\n• Profit improvement tips\n• Inventory suggestions\n• Marketing strategies`,
    time: Date.now()
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [dashData, setDashData] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (user?.uid) getDashboardData(user.uid).then(setDashData)
  }, [user])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Reset messages when language changes
  const handleLangChange = (lang) => {
    setAiLang(lang)
    const greetings = {
      english: `Hello! I'm your AI business assistant for ${shopData?.shopName}.\n\nNow responding in English. Ask me anything!\n\n• Sales analysis\n• Profit tips\n• Inventory help\n• Marketing ideas`,
      hindi: `नमस्ते! मैं ${shopData?.shopName} का AI बिजनेस असिस्टेंट हूं।\n\nअब मैं हिंदी में जवाब दूंगा। कुछ भी पूछें!\n\n• बिक्री विश्लेषण\n• मुनाफा बढ़ाने के टिप्स\n• इन्वेंटरी सुझाव\n• मार्केटिंग स्ट्रेटेजी`,
      hinglish: `Hello! Main ${shopData?.shopName} ka AI Business Assistant hoon.\n\nAb main Hinglish mein baat karunga. Kuch bhi poochho!\n\n• Sales analysis\n• Profit badhane ke tips\n• Inventory suggestions\n• Marketing ideas`
    }
    setMessages([{ role: 'assistant', content: greetings[lang], time: Date.now() }])
  }

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText) return

    setMessages(prev => [...prev, { role: 'user', content: userText, time: Date.now() }])
    setInput('')
    setLoading(true)

    try {
      const shopContext = buildShopContext(shopData, dashData)

      const langInstructions = {
        english: 'IMPORTANT: You MUST respond ONLY in English. No Hindi or Hinglish.',
        hindi: 'महत्वपूर्ण: आप केवल हिंदी में जवाब दें। English या Hinglish बिल्कुल नहीं।',
        hinglish: 'IMPORTANT: Respond in Hinglish only (mix of Hindi and English). Example: "Aapki sales badhane ke liye..."'
      }

      const systemPrompt = `You are SellNiti AI, a smart business advisor for Indian small shop owners.

Shop Data:
${shopContext}

${langInstructions[aiLang]}

Response Format Rules (STRICTLY FOLLOW):
1. Use bullet points (start with •) for lists
2. Use numbered points for steps
3. Keep paragraphs short — max 2-3 lines each
4. Add blank line between sections
5. Give actionable tips only
6. Max 150 words total
7. End with one specific action tip

DO NOT use ** for bold, DO NOT use # for headers, DO NOT write long paragraphs.`

      const res = await fetch(`${import.meta.env.VITE_AI_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, shopContext: systemPrompt })
      })

      const data = await res.json()
      const formatted = formatMessage(data.reply || 'Sorry, could not process that.')

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: formatted,
        time: Date.now()
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Please check your backend is running.',
        time: Date.now()
      }])
    } finally {
      setLoading(false)
    }
  }

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
  const suggestions = SUGGESTIONS[aiLang]

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>AI Assistant</h1>
          <p className={textSecondary}>Powered by Groq — knows your business</p>
        </div>

        {/* Language Selector */}
        <div className={`flex items-center gap-1 p-1 rounded-xl ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-100'}`}>
          <RiTranslate2 className={`w-4 h-4 mx-2 ${textSecondary}`} />
          {LANGUAGES.map(lang => (
            <button
              key={lang.value}
              onClick={() => handleLangChange(lang.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                aiLang === lang.value
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="flex flex-col p-0 overflow-hidden" style={{ height: '560px' }}>

          {/* Chat Header */}
          <div className={`px-6 py-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <RiRobotLine className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${textPrimary}`}>SellNiti AI</p>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
                  Online • {LANGUAGES.find(l => l.value === aiLang)?.flag} {LANGUAGES.find(l => l.value === aiLang)?.label}
                </p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
              Groq • Llama 3.1
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} theme={theme} />
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-2 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <RiRobotLine className="w-4 h-4 text-white" />
                </div>
                <div className={`rounded-2xl rounded-bl-sm px-4 py-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className="flex gap-1.5 items-center">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                    <span className={`text-xs ml-1 ${textSecondary}`}>thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length <= 2 && (
            <div className={`px-6 py-2 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
              <p className={`text-xs mb-2 ${textSecondary}`}>Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => sendMessage(s)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      theme === 'dark'
                        ? 'border-white/10 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/5'
                        : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={
                  aiLang === 'hindi' ? 'कुछ भी पूछें...' :
                  aiLang === 'hinglish' ? 'Kuch bhi poochho...' :
                  'Ask me anything about your business...'
                }
                className={`flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-400'
                }`}
              />
              <Button type="submit" disabled={!input.trim() || loading}
                icon={<RiSendPlane2Line className="w-4 h-4" />}>
                {aiLang === 'hindi' ? 'भेजें' : 'Send'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}