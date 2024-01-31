const router = require('express').Router()
const {register, login, forgotpassword, resetpassword, confirmUser, resendEmail, checkUser} = require('../controllers/auth')

router.post('/register', register)

router.post('/login', login)

router.put('/confirm-user/:confirmationToken', confirmUser)

router.put('/resend-email/', resendEmail)

router.post('/forgot-password', forgotpassword)

router.put('/reset-password/:resetToken', resetpassword)

module.exports = router;