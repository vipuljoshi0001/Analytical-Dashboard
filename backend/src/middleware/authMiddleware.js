export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  // For full token verification, use Firebase Admin SDK
  // For now, we trust frontend Firebase auth
  req.userId = token
  next()
}

export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  req.userId = token || null
  next()
}