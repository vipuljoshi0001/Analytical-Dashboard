// Firebase Admin SDK (optional — for server-side verification)
// For this project, frontend SDK handles auth + DB directly
// This is a placeholder for future admin operations

export const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID || null
}

export default firebaseAdminConfig