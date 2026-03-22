import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 20
    },

   role: {
       type: String,
       enum: ["User", "Shopkeeper"],
        default: "User"
   }

})
export const User = mongoose.model('User', userSchema);