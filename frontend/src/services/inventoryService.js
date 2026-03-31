import { db } from '../firebase/config'
import {
  collection, addDoc, getDocs, updateDoc,
  deleteDoc, doc, query, where, orderBy, onSnapshot
} from 'firebase/firestore'

const col = (shopId) => collection(db, 'shops', shopId, 'inventory')

export const addProduct = (shopId, data) =>
  addDoc(col(shopId), { ...data, createdAt: new Date().toISOString() })

export const getProducts = async (shopId) => {
  const snap = await getDocs(query(col(shopId), orderBy('name')))
  return snap.docs.map(d => ({ itemId: d.id, ...d.data() }))
}

export const subscribeProducts = (shopId, callback) =>
  onSnapshot(query(col(shopId), orderBy('name')), snap =>
    callback(snap.docs.map(d => ({ itemId: d.id, ...d.data() })))
  )

export const updateProduct = (shopId, itemId, data) =>
  updateDoc(doc(db, 'shops', shopId, 'inventory', itemId), data)

export const deleteProduct = (shopId, itemId) =>
  deleteDoc(doc(db, 'shops', shopId, 'inventory', itemId))

export const reduceStock = async (shopId, items) => {
  const promises = items.map(item =>
    updateDoc(doc(db, 'shops', shopId, 'inventory', item.itemId), {
      quantity: item.quantity - item.qty
    })
  )
  return Promise.all(promises)
}