import categoryService from "../Services/category-service.js";

const CategoryService  = new categoryService();

export const getProductsbyCategory = async (req, res) => {
    try {
        const category = await CategoryService.GetProductsByCategory(req.params.category);
        return res.status(200).json({
            sucess: true,
            message: "sucessfully fetched products by category",
            data: category,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            Message: "Error fetching products by category",
            data: {},
            err: error.message
        })
    }
}