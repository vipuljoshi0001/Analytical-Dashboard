import { auth } from './config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'

export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logoutUser = () => signOut(auth)

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback)

export const updateUserProfile = (displayName) =>
  updateProfile(auth.currentUser, { displayName })