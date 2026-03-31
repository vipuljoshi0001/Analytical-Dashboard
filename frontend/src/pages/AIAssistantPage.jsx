import { useState, useRef, useEffect } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { getDashboardData } from '../services/dashboardService'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSendPlane2Line, RiRobotLine } from 'react-icons/ri'

export default function AIAssistantPage() {
  const { user, shopData } = useAuth()
  const { t } = useLang()
  const { theme } = useTheme()
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hello! I'm your AI business assistant for **${shopData?.shopName || 'your shop'}**. Ask me anything about your sales, inventory, or business strategies! 🚀`
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
  }, [messages])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText) return

    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setInput('')
    setLoading(true)

    try {
      const context = dashData ? `
Shop: ${shopData?.shopName}, GST: ${shopData?.gstNumber}
Today's Sales: ₹${dashData.todaySales}
Monthly Sales: ₹${dashData.monthlySales}
Monthly Profit: ₹${dashData.totalProfit}
Monthly Orders: ${dashData.monthlyOrders}
Top Sellers: ${dashData.topSellers?.map(s => s?.name).join(', ')}
Low Stock Items: ${dashData.lowStock?.map(s => s?.name).join(', ') || 'None'}
      ` : ''

      const res = await fetch(`${import.meta.env.VITE_AI_API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          shopContext: context
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, I could not process that.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Could not connect to AI. Please check your backend.' }])
    } finally {
      setLoading(false)
    }
  }

  const suggestions = t('ai.suggestions')
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500'

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${textPrimary}`}>{t('ai.title')}</h1>
          <p className={textSecondary}>Powered by AI — knows your business</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="h-[520px] flex flex-col p-0 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <RiRobotLine className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className={`text-sm font-semibold ${textPrimary}`}>SellNiti AI</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"/>
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-sm'
                      : theme === 'dark'
                        ? 'bg-white/5 text-slate-200 rounded-bl-sm border border-white/5'
                        : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className={`rounded-2xl px-4 py-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && (
            <div className="px-6 pb-3 flex flex-wrap gap-2">
              {suggestions?.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    theme === 'dark'
                      ? 'border-white/10 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 hover:bg-indigo-500/5'
                      : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage() }} className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('ai.placeholder')}
                className={`flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-400'
                }`}
              />
              <Button type="submit" disabled={!input.trim() || loading}
                icon={<RiSendPlane2Line className="w-4 h-4" />}>
                Send
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}