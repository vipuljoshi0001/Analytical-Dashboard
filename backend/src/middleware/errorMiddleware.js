export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`)
  const status = err.status || err.statusCode || 500
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

export const notFound = (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` })
}

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)