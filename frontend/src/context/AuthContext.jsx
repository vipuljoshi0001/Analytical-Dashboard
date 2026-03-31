import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [shopData, setShopData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        const snap = await getDoc(doc(db, 'shops', u.uid))
        if (snap.exists()) setShopData(snap.data())
      } else {
        setShopData(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const register = async (email, password, shopInfo) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const shopDoc = {
      shopId: cred.user.uid,
      email,
      shopName: shopInfo.shopName,
      gstNumber: shopInfo.gstNumber,
      phone: shopInfo.phone,
      billCounter: 0,
      createdAt: new Date().toISOString()
    }
    await setDoc(doc(db, 'shops', cred.user.uid), shopDoc)
    setShopData(shopDoc)
    return cred
  }

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, shopData, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)