import { db } from '../firebase/config'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

export const createShopProfile = async (uid, shopData) => {
  const shopDoc = {
    shopId: uid,
    shopName: shopData.shopName,
    gstNumber: shopData.gstNumber,
    phone: shopData.phone,
    email: shopData.email,
    billCounter: 0,
    createdAt: new Date().toISOString()
  }
  await setDoc(doc(db, 'shops', uid), shopDoc)
  return shopDoc
}

export const getShopProfile = async (uid) => {
  const snap = await getDoc(doc(db, 'shops', uid))
  return snap.exists() ? snap.data() : null
}

export const updateShopProfile = async (uid, data) => {
  await updateDoc(doc(db, 'shops', uid), data)
}