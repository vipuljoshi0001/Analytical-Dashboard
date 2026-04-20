export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  req.userId = token
  next()
}

export const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  req.userId = token || null
  next()
}
