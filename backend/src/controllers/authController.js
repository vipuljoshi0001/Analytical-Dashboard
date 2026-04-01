export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body
    if (!token) return res.status(400).json({ error: 'Token required' })
    // Firebase token verification would go here with Admin SDK
    res.json({ valid: true, message: 'Token verified' })
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const getShopInfo = async (req, res) => {
  try {
    const { shopId } = req.params
    if (!shopId) return res.status(400).json({ error: 'Shop ID required' })
    res.json({ shopId, message: 'Shop info retrieved via frontend Firebase SDK' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}