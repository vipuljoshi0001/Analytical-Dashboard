// Firebase is used as primary DB (via frontend SDK)
// This file is for future MongoDB/PostgreSQL integration if needed
export const dbConfig = {
  type: 'firebase',
  initialized: true
}

export default dbConfig