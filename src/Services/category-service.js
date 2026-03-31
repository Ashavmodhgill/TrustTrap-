import categoryRepository from "../Repository/category-repository.js";
class categoryService{
 constructor(){
    this.CategoryRepository = new categoryRepository();
 }

async GetProductsByCategory(category){
    const validCategories = ["Mobile Phones", "Laptops", "Accessories"];
    if(!validCategories.includes(category)){
        throw new Error("Invalid category. Valid categories are: " + validCategories.join(", "));
    }
    try {
        return await this.CategoryRepository.getProductsBycategory(category);
    } catch (error) {
        console.log("Category service error:", error.message, error.stack);
        throw error;
    }
}
}

export default categoryService;