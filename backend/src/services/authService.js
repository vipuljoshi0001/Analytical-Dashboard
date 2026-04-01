export const verifyFirebaseToken = async (token) => {
  // Implement with Firebase Admin SDK for production
  // npm install firebase-admin
  // const admin = require('firebase-admin')
  // return admin.auth().verifyIdToken(token)
  return { uid: token, verified: true }
}

export const getUserById = async (uid) => {
  return { uid, source: 'firebase' }
}