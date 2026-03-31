import mongoose from "mongoose";

const ShopProfileSchema =  new mongoose.Schema({
    Shopname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
     address: { 
        type: String
     },
    rating: {
         type: Number, 
         default: 0 
        },
    description: { 
        type: String
     },
     imageUrl: { 
        type: String
     },
     products: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "Product" 
        }]
}, { timestamps: true });


const ShopProfile = mongoose.model('ShopProfile', ShopProfileSchema);
export default ShopProfile;