import Product from "../models/product.js";
import CrudRepository from "./Crude-Repository.js";

class ProductRepository extends CrudRepository {
    constructor(){
        super(Product);
    }
    async findByCategory(category){
        try {
          return await Product.find({ category}).populate('shopkeeper', 'name email');
        } catch (error) {
            console.error("product repo error:", error.message, error.stack);
            throw error;
        }
    }
    
    async findByShopkeeper(shopkeeperId){
        try {
            return await Product.find({ shopkeeper: shopkeeperId }).populate('shopkeeper', 'name email');
        } catch (error) {
            console.error("product repo error:", error.message, error.stack);
            throw error;
        }
    }

}
export default ProductRepository;