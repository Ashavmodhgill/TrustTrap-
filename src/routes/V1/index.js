import express from 'express';

import { signUp,login } from '../../controller/auth-controller.js';
import {
    createProduct,
     updateProduct,
    getProducts,
    getproductById,
   delecteProduct,
    getproductByCategory,
    getproductByShopkeeper
} from  '../../controller/product-controller.js';

import passport from "passport";

const router = express.Router();


router.post('/signup',signUp);
router.post('/login',login);
  
// so here before creating or manuplating the product i am checking that the person is shopkeeper
router.post('/product', passport.authenticate('jwt', {session: false}), createProduct);
router.put("/:id", passport.authenticate("jwt", { session: false }), updateProduct);
router.delete("/:id", passport.authenticate("jwt", { session: false }), delecteProduct);

// here the normal user can see the product but cannot manuplate the product
router.get("/", getProducts);
router.get("/:id", getproductById);
router.get("/category/:category",getproductByCategory);
router.get("/shopkeeper/:shopkeeperId",getproductByShopkeeper);

export default router;
