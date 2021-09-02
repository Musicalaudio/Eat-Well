const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} =  require('validator')


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        lowercase: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Password must be atleast 6 characters"],
        maxlength: [15, "Password must be no longer than 15 characters"]
    }
})

//encrypting the password with hashing and salt
UserSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err)
    }
})


const User = mongoose.model('user', UserSchema)
module.exports = User;