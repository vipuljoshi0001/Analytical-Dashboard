import { createContext, useContext, useState } from 'react'
import { getTranslation } from '../translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('sellniti-lang') || 'en')

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en'
    setLang(next)
    localStorage.setItem('sellniti-lang', next)
  }

  const t = (key) => getTranslation(lang, key)

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)