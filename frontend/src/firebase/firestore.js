import { db } from './config'
import {
  collection, doc, setDoc, getDoc,
  getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, where, onSnapshot,
  increment, serverTimestamp
} from 'firebase/firestore'

export {
  collection, doc, setDoc, getDoc,
  getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, where, onSnapshot,
  increment, serverTimestamp, db
}