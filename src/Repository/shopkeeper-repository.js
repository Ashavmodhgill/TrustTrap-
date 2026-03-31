import ShopProfile from "../models/shop-profile.js";
import CrudRepository from "./Crude-Repository.js";

class shopkeeperRepository extends CrudRepository {
    constructor() {
        super(ShopProfile);
    }

    async getShopByEmail(email) {
        try {
            return await this.model.findOne({ email: email }).populate("products");
            
        } catch (error) {
            throw new Error("Error occurred while fetching shop by email");
        }
    }

    async getShopkeeperWithProducts(id){
        try {
            return await this.model.findById(id).populate("products");
        } catch (error) {
            throw new Error("Error occurred while fetching shopkeeper with products");
        }
    }
}

export default shopkeeperRepository;