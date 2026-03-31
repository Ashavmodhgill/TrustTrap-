import Product from "../models/product.js";

class categoryRepository {
    async getProductsBycategory(category){
        return await Product.find({category : category})
    }
}

export default categoryRepository;