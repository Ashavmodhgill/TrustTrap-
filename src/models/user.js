import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
        
    },

   role: {
       type: String,
       enum: ["User", "Shopkeeper"],
        default: "User"
   }

})

// this is bycrypt I am  encrypting the password  for your understanding

userSchema.pre('save', async function(){
    const user = this;
    if (!user.isModified('password')) return;
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password= encryptedPassword;

});
userSchema.methods.comparePassword = function compare(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate(){
     return jwt.sign({id: this.id, email: this.email}, 'Trap_hai_bahi_ye_youwillgeteverthing_ashavdeep', {
        expiresIn: '1h'
     })
}


 const User = mongoose.model('User', userSchema);
    export default User;