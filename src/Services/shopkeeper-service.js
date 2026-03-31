// Services/shopkeeper-service.js
import ShopkeeperRepository from "../Repository/shopkeeper-repository.js";

class ShopkeeperService {
    constructor() {
        this.shopkeeperRepository = new ShopkeeperRepository();
    }

    async createShopkeeper(data) {
        try {
            const shopkeeper = await this.shopkeeperRepository.create(data);
            return shopkeeper;
        } catch (error) {
            console.log("Shopkeeper service error (create):", error.message, error.stack);
            throw error;
        }
    }

    async getShopkeepers() {
        try {
            return await this.shopkeeperRepository.getAll();
        } catch (error) {
            console.log("Shopkeeper service error (getAll):", error.message, error.stack);
            throw error;
        }
    }

    async getShopkeeperById(id) {
        try {
            return await this.shopkeeperRepository.getShopkeeperWithProducts(id);
        } catch (error) {
            console.log("Shopkeeper service error (getById):", error.message, error.stack);
            throw error;
        }
    }

    async updateShopkeeper(id, data) {
        try {
            return await this.shopkeeperRepository.Update(id, data);
        } catch (error) {
            console.log("Shopkeeper service error (update):", error.message, error.stack);
            throw error;
        }
    }

    async deleteShopkeeper(id) {
        try {
            return await this.shopkeeperRepository.destroy(id);
        } catch (error) {
            console.log("Shopkeeper service error (delete):", error.message, error.stack);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            return await this.shopkeeperRepository.getShopByEmail(email);
        } catch (error) {
            console.log("Shopkeeper service error (findByEmail):", error.message, error.stack);
            throw error;
        }
    }
}

export default ShopkeeperService;
