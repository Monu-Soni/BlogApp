const config = {
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL)
}
export default config

