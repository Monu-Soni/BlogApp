import { Client, Account, ID } from "appwrite"
import config from "../config/config"

export class authService {
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.projectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userData = await this.account.create(ID.unique(), email, password, name)
            if (userData) { return this.Login({ email, password }) }
            else { return userData; }
        }
        catch (error) { console.log("error in creating account", error) }
    }

    async Login({ email, password }) {
        try { return await this.account.createEmailPasswordSession(email, password) }
        catch (error) { console.log(" Login failed", error) }
    }

    async getCurrentUser() {
        try { return await this.account.get() }
        catch (error) { console.log("Error in getting User", error) }
    }

    async logout() {
        try { return await this.account.deleteSession("current") }
        catch (error) { console.log("logout failed", error) }
    }
}

const AuthService = new authService()

export default AuthService
