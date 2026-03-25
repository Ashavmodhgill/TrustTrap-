import ProductService from "../Services/product-service.js";

const productService = new ProductService();

export const createProduct = async (req, res) =>{
    try {
        const product = await productService.createProduct(req.body, req.user._id);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully created a new product",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error creating product",
            data: {},
            err: error.message
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const product = await productService.getProducts();
        return res.status(201).json({
            sucess: true,
            message: "sucessfully featched all products",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error featching products",
            data: {},
            err: error.message
        })
    }
}

export const getproductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully featched product by id",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error featching product by id",
            data: {},
            err: error.message
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully updated product",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error updating product",
            data: {},
            err: error.message
        })
    }
}

export const delecteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully deleted product",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error deleting product",
            data: {},
            err: error.message
        })

    }
}

export const getproductByCategory = async (req, res) => {
    try {
        const product = await productService. getProductsByCategory(req.params.category);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully featched product by category",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error featching product by category",
            data: {},
            err: error.message
        })
    }
}

export const getproductByShopkeeper = async (req, res) => {
    try {
        const product = await productService. getProductByShopkeeper(req.params.shopkeeperId);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully featched product by shopkeeper",
            data: product,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error featching product by shopkeeper",
            data: {},
            err: error.message
        })
    }
}