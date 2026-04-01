import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import app from './config'

const storage = getStorage(app)

export const uploadFile = async (path, file) => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

export const deleteFile = async (path) => {
  const storageRef = ref(storage, path)
  return deleteObject(storageRef)
}

export default storage