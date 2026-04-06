import express from 'express';

import { signUp,login } from '../../controller/auth-controller.js';
import {
    createProduct,
     updateProduct,
    getProducts,
    getproductById,
   delecteProduct,
   GetproductByCategory,
    getproductByShopkeeper
} from  '../../controller/product-controller.js';

//shopkeeper routes

import {
    createShopkeeper,
    getShopkeepers,
    getShopkeeperById,
    updateShopkeeper,
    deleteShopkeeper,
    findShopkeeperByEmail
} from  '../../controller/shopkeeper-controller.js';

import { getProductsbyCategory } from '../../controller/category-controller.js';
import passport from "passport";
import { shoppingBot } from "../../controller/chatbot-controller.js";
const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
  
// product routes
router.post('/products', passport.authenticate('jwt', {session: false}), createProduct);
router.put('/products/:id', passport.authenticate("jwt", { session: false }), updateProduct);
router.delete('/products/:id', passport.authenticate("jwt", { session: false }), delecteProduct);



router.get('/products', getProducts);
router.get('/products/:id', getproductById);
router.get('/products/shopkeeper/:shopkeeperId', getproductByShopkeeper);


//shopkeeper routes
router.post("/shopkeepers", createShopkeeper);
router.get("/shopkeepers", getShopkeepers);
router.get("/shopkeepers/:id", getShopkeeperById);
router.put("/shopkeepers/:id", updateShopkeeper);
router.delete("/shopkeepers/:id", deleteShopkeeper);
router.get("/shopkeepers/email/:email", findShopkeeperByEmail);


router.get('/categories/:category', getProductsbyCategory );
// Product routes
router.get('/products/category/:category',GetproductByCategory);

// chatbot routes
router.post("/chatbot", shoppingBot);
export default router;
