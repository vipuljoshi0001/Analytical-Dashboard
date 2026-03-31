import en from './en.json'
import hi from './hi.json'

export const translations = { en, hi }

export const getTranslation = (lang, key) => {
  const keys = key.split('.')
  let result = translations[lang]
  for (const k of keys) {
    result = result?.[k]
    if (!result) return key
  }
  return result
}