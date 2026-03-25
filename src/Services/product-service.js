import ProductRepository from "../Repository/product-repository.js";

class ProductService {
    constructor(){
        this.ProductRepository = new ProductRepository();
        
    }
    async createProduct(data,shopkeeperId){
       try {
         const productData = { ...data, shopkeeper: shopkeeperId };
        const product = await this.ProductRepository.create(productData);
        return product;
       } catch (error) {
        console.log("Product service error:", error.message, error.stack);
        throw error;
       }
    }
    async getProducts(){
        try {
            return await this.ProductRepository.getAll();
        } catch (error) {
            console.log("Product service error:", error.message, error.stack);
            throw error;
        }
    }
    async getProductById(id){
        try {
          return await this.ProductRepository.findById(id);
            
        } catch (error) {
            console.log("Product service error:", error.message, error.stack);
            throw error;
        }
    }

    async updateProduct(id, data){
        try {
            return await this.ProductRepository.update(id, data);
        } catch (error) {
            console.log("Product service error:", error.message, error.stack);
            throw error;
        }
}
    async getProductsByCategory(category){
        try {
            return await this.ProductRepository.findByCategory(category);
        } catch (error) {
            console.log("Product service error:", error.message, error.stack);
            throw error;
        }
    }
    async getProductByShopkeeper(shopkeeperId){
        try {
            return await this.ProductRepository.findByShopkeeper(shopkeeperId);
        } catch (error) {
            console.log("Product service error:", error.message, error.stack);
            throw error;
        }
    }
    async deleteProduct(id){
        try {
            return await this.ProductRepository.destroy(id);
        } catch (error) {
            console.log("Product service error:", error.message, error.stack);
            throw error;
        }
}

}
export default ProductService;