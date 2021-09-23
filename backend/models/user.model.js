const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} =  require('validator')

const userSchema = new mongoose.Schema({
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
    },
    savedRecipes: [{id: {type: String, required: true},
                    title: {type: String, required: true},
                    image: {type: String, required: true},
                    imageType: {type: String, required: true},}
                  ]
})

//encrypting the password with hashing and salt
userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        next(err)
    }
})

//static method to log in a user
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