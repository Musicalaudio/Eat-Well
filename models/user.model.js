const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {isEmail} =  require('validator')
const crypto = require('crypto');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        minlength: [3, "Password must be atleast 6 characters"],
        maxlength: [12, "Password must be no longer than 12 characters"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        lowercase: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email"],
        select: false,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be atleast 6 characters"],
        maxlength: [15, "Password must be no longer than 15 characters"],
        select: false,
    },
    confirmEmailToken: String,
    confirmEmailExpire: Date, 
    isVerified: Boolean,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    savedRecipes: [{_id: {type: String, required: true},
                    id: {type: String, required: true},
                    title: {type: String, required: true},
                    image: {type: String, required: true},
                    imageType: {type: String, required: true},}
                  ]
})


//encrypting the password with hashing and salt
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err)
    }
})

//Check if password in the db is the same as the provided password
userSchema.methods.matchPasswords = async function(password){
    return bcrypt.compare(password, this.password);
};


userSchema.methods.getSignedToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

// userSchema.methods.getRefreshToken = function(){
//     return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET)
// }

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)  //Time now + (10 x 1 minute) so it expires in 10 minutes 
    return resetToken;
}

userSchema.methods.getConfirmationToken = function(){
    const confirmationToken = crypto.randomBytes(20).toString("hex")
    this.confirmEmailToken = crypto
        .createHash("sha256")
        .update(confirmationToken)
        .digest("hex")
    this.confirmEmailExpire = Date.now() + 20 * (60 * 1000) //Time now + (10 x 1 minute) so it expires in 10 minutes 
    return confirmationToken;
}

// static method to log in a user
userSchema.statics.login =  async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};


const User = mongoose.model('user', userSchema)
module.exports = User;