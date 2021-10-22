const User = require("../models/user.model")
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const {isEmail} =  require('validator')

exports.register = async(req, res, next) => {
    const {username, email, password} = req.body;
    const confirmationToken = crypto.randomBytes(20).toString("hex")
    try{
        const user = await User.create({
            username, 
            email, 
            password,
            confirmEmailToken: crypto.createHash("sha256").update(confirmationToken).digest("hex"),
            confirmEmailExpire: Date.now() + 20 * (60 * 1000),
            isVerified: false
        });        
        const verifieduser = await User.findOne({email}).select("-password").select("-email")
        sendToken(verifieduser, 201, res)    

        if(process.env.NODE_ENV === 'production'){
            const confirmUrl = `https://eat-well5.herokuapp.com/confirm-email/${confirmationToken}`;
        }else{
            const confirmUrl = `http://localhost:3000/confirm-email/${confirmationToken}`;
        }
        
        const message = `
            <h1>This email is to confirm your account with Eat-Well</h1>
            <p>Please go to this link to confirm that you created an account with this email</p>
            <a href=${confirmUrl} clicktracking=off>${confirmUrl}</a> `
        
        try{
            sendEmail({
                to: user.email,
                subject: "Eat-Well user email confirmation",
                text: message
            });
            res.status(200).json({success: true, data: "Email Sent"})
        }catch(err){
            user.confirmEmailToken = undefined;
            user.confirmationEmailExpired = undefined;

            await user.save();
            return next(new ErrorResponse("Email could not be sent", 500))
        }
    }catch(err){
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const {usernameOrEmail, password} = req.body;

    if(!usernameOrEmail || !password ){
        let loginError = {usernameOrEmail: "", password: ""}

        if(!usernameOrEmail){
            loginError.usernameOrEmail = true;
        }
        if(!password){
            loginError.password = true;
        }        
        res.status(400).json(loginError);
    }

    try{
        const user = await User.findOne({$or: [{email: usernameOrEmail}, {username:usernameOrEmail}]}).select("+password");
        console.log('user: ',  user)
        if(!user){
            return next(new ErrorResponse("The username or email you've entered doesn't belong to an account", 401))
        }
        const isMatch = await user.matchPasswords(password);
        if(!isMatch){
            return next(new ErrorResponse("The password you've entered is incorrect", 401))
        }
        //once verified exclude password from user that we'll sign with token
        const verifieduser = await User.findOne({$or: [{email: usernameOrEmail}, {username:usernameOrEmail}]}).select("-password").select("-email")
        sendToken(verifieduser, 200, res)

    }catch(err){
        next(err);
    }
}

exports.forgotpassword =  async (req, res, next) => {
    const {email} = req.body;
    
    try{
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent", 404))
        }
        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = user.getResetPasswordToken();
        await user.save();

        // Create reset url to email to provided email
        // const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        if(process.env.NODE_ENV === 'production'){
            const confirmUrl = `https://eat-well5.herokuapp.com/reset-password/${resetToken}`;
        }else{
            const confirmUrl = `http://localhost:3000/reset-password/${resetToken}`;
        }
        
        // HTML Message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        
        try{
            await sendEmail({
                to: email,
                subject: "Password Reset Request",
                text: message
            });
            res.status(200).json({success: true, data: "Email Sent"})
        }catch(err){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500))
        }
    }catch(err){
        next(err)
    }
}

exports.confirmUser = async(req, res, next) => {
    const confirmEmailToken = crypto.createHash("sha256").update(req.params.confirmationToken).digest("hex");
    try{
        const user = await User.findOne({
            confirmEmailToken,
            confirmEmailExpire: { $gt: Date.now() }
        })
        if(!user){
            return next(new ErrorResponse("Your confirmation link has expired either because you're already verified or took too long to verify.", 400))
        }
        user.isVerified = true;
        user.confirmEmailToken = undefined;
        user.confirmEmailExpire = undefined;

        await user.save();
        sendToken(user, 201, res)
    }
    catch(err){
        next(err)
    }
}

exports.resetpassword = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try{
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if(!user){
            return next(new ErrorResponse("Invalid Reset Token", 400))
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(201).json({
            success: true,
            data: "Password reset successful"
        })
    }catch(err){
        next(err)
    }
}

exports.resendEmail = async (req, res, next) => {
    //credit to S. L. Gupta https://stackoverflow.com/a/63608741/9222628
    const email = req.body.email
    if(!isEmail(email)){
        return res.status(400).send('Please enter a valid email address.')
    }
    User.findOne({ email }, function (err, user) {
        // user is not found into database
        if (!user){
            return res.status(200).send('If the email is registered, an email was sent.');
        }
        // user has been already verified
        else if (user.isVerified){
            return res.status(200).send('This account has been already verified');
    
        }
        else{
            sendConfirmationEmail(user, res, next)
        } 
    })
}

const sendConfirmationEmail = async (user, res, next) => {
    const confirmationToken = user.getConfirmationToken();
    // const confirmUrl = `http://localhost:3000/confirm-email/${confirmationToken}`;
    if(process.env.NODE_ENV === 'production'){
        const confirmUrl = `https://eat-well5.herokuapp.com/confirm-email/${confirmationToken}`;
    }else{
        const confirmUrl = `http://localhost:3000/confirm-email/${confirmationToken}`;
    }

    const message = `
        <h1>This email is to confirm your account with Eat-Well</h1>
        <p>Please go to this link to confirm that you created an account with this email</p>
        <a href=${confirmUrl} clicktracking=off>${confirmUrl}</a> `
    
    try{
        await sendEmail({
            to: user.email,
            subject: "Eat-Well user email confirmation",
            text: message
        });
        res.status(200).json({success: true, data: "Email Sent"})
    }catch(err){
        user.confirmEmailToken = undefined;
        user.confirmationEmailExpired = undefined;

        await user.save();
        // next(err)
        return next(new ErrorResponse("Email could not be sent", 500))
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, user})
} 

