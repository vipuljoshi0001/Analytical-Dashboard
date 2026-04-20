export const verifyFirebaseToken = async (token) => {
 
  return { uid: token, verified: true }
}

export const getUserById = async (uid) => {
  return { uid, source: 'firebase' }
}
