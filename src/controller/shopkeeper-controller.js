import ShopkeeperService from "../Services/shopkeeper-service.js";

const shopkeeperService = new ShopkeeperService();

export const createShopkeeper = async (req, res) => {
    try {
    const shopkeeper = await shopkeeperService.createShopkeeper(req.body);
    return res.status(201).json({
          sucess: true,
            message: "sucessfully created a new shopkeeper",
            data: shopkeeper,
            err:{}
    })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error creating shopkeeper",
            data: {},
            err: error
        })
    }
}

export const getShopkeepers = async (req, res)=> {
    try {
        const shopkeepers = await shopkeeperService.getShopkeepers()
        return res.status(201).json({
            sucess: true,
            message: "sucessfully fetched shopkeepers",
            data: shopkeepers,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error fetching shopkeepers",
            data: {},
            err: error
        })
    }
}

export const getShopkeeperById = async (req, res) => {
    try {
        const shopkeeper = await shopkeeperService.getShopkeeperById(req.params.id);
        return res.status(200).json({
                   sucess: true,
            message: "sucessfully fetched shopkeeper",
            data: shopkeeper,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error fetching shopkeeper",
            data: {},
            err: error
        })
    }
}

export const updateShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await shopkeeperService.updateShopkeeper(req.params.id, req.body);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully updated shopkeeper",
            data: shopkeeper,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error updating shopkeeper",
            data: {},
            err: error
        })
    }
}

export const deleteShopkeeper = async (req, res) => {
    try {
        const shopkeeper = await shopkeeperService.deleteShopkeeper(req.params.id);
        return res.status(201).json({
            sucess: true,
            message: "sucessfully deleted shopkeeper",
            data: shopkeeper,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error deleting shopkeeper",
            data: {},
            err: error
        })
    }
}

export const findShopkeeperByEmail = async (req, res) => {
    try {
        const shopkeeper = await shopkeeperService.findByEmail(req.params.email);
        return res.status(200).json({
            sucess: true,
            message: "sucessfully fetched shopkeeper",
            data: shopkeeper,
            err:{}
        })
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error fetching shopkeeper",
            data: {},
            err: error
        })
    }
} 