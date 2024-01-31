const router = require('express').Router()
const { getPrivateRoute } = require('../controllers/private'); 
const { protect } = require('../middleware/auth')

router.route("/private-screen").get(protect, getPrivateRoute);

module.exports = router;