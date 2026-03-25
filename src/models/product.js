import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type:String,
        required: true
    },
     category:{
        type: String,
        required: true
     },
     shopkeeper: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",   
     required: true
  },
  imageUrl:{
    type: String,
    required: true
  }
})

const Product = mongoose.model('Product', ProductSchema);
export default Product;