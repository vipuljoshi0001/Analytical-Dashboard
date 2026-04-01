export const getShop = async (req, res) => {
  try {
    const { shopId } = req.params
    res.json({ shopId, message: 'Use frontend Firebase SDK for shop operations' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateShop = async (req, res) => {
  try {
    const { shopId } = req.params
    const updates = req.body
    res.json({ shopId, updates, message: 'Update via frontend Firebase SDK' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}