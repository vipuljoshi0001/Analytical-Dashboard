import { db } from '../firebase/config'
import {
  collection, addDoc, getDocs, doc,
  updateDoc, increment, query, orderBy, onSnapshot
} from 'firebase/firestore'
import { reduceStock } from './inventoryService'

export const createBill = async (shopId, billData, cartItems, inventoryItems) => {
  const shopRef = doc(db, 'shops', shopId)

  // Increment bill counter
  await updateDoc(shopRef, { billCounter: increment(1) })

  // Reduce inventory
  const fullItems = cartItems.map(ci => {
    const inv = inventoryItems.find(i => i.itemId === ci.itemId)
    return { ...ci, quantity: inv.quantity }
  })
  await reduceStock(shopId, fullItems)

  // Save bill
  const bill = {
    ...billData,
    shopId,
    items: cartItems,
    createdAt: new Date().toISOString()
  }
  return addDoc(collection(db, 'shops', shopId, 'bills'), bill)
}

export const subscribeBills = (shopId, callback) =>
  onSnapshot(
    query(collection(db, 'shops', shopId, 'bills'), orderBy('createdAt', 'desc')),
    snap => callback(snap.docs.map(d => ({ billId: d.id, ...d.data() })))
  )

export const getBills = async (shopId) => {
  const snap = await getDocs(
    query(collection(db, 'shops', shopId, 'bills'), orderBy('createdAt', 'desc'))
  )
  return snap.docs.map(d => ({ billId: d.id, ...d.data() }))
}