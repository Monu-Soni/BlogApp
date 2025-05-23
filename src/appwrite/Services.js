import { Client, ID, Databases, Storage, Query } from "appwrite"
import config from '../config/config'

export class services {
    client = new Client();
    databases;
    Bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)
        this.databases = new Databases(this.client)
        this.Bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, images, status, userId }) {
        try {
            return await this.databases.createDocument(config.databaseId, config.collectionId, slug,
                { title, content, images, status, userId }
            )
        }
        catch (error) { console.log("Appwrite serive :: createPost :: error", error) }
    }

    async updatePost(slug, { title, content, images, status }) {
        try {
            return await this.databases.updateDocument(config.databaseId, config.collectionId, slug,
                { title, content, images, status, }
            )
        }
        catch (error) { console.log("Appwrite serive :: updatePost :: error", error) }
    }

    async deletePost(slug) {
        try { await this.databases.deleteDocument(config.databaseId, config.collectionId, slug); return true }
        catch (error) { console.log("Appwrite serive :: deletePost :: error", error); return false }
    }

    async getPost(slug) {
        try { return await this.databases.getDocument(config.databaseId, config.collectionId, slug) }
        catch (error) { console.log("Appwrite serive :: getPost :: error", error); return false }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try { return await this.databases.listDocuments(config.databaseId, config.collectionId, queries,) }
        catch (error) { console.log("Appwrite serive :: getPosts :: error", error); return false }
    }

    // file upload service
    async uploadFile(file) {
        try { return await this.Bucket.createFile(config.bucketId, ID.unique(), file) }
        catch (error) { console.log("Appwrite serive :: uploadFile :: error", error); return false }
    }

    async deleteFile(fileId) {
        try { await this.Bucket.deleteFile(config.bucketId, fileId); return true }
        catch (error) { console.log("Appwrite serive :: deleteFile :: error", error); return false }
    }

    getFilePreview(fileId) {
        try {return this.Bucket.getFileView(config.bucketId, fileId)}
        catch (error) {console.log(`Image error:: ${error}`)}
    }
}

const Services = new services()
export default Services