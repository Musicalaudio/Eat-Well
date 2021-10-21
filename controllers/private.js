exports.getPrivateRoute = (req, res, next) => {
    res.status(200).json({
        user: req.user,
        success: true,
        data: "You got access to the private data in the route",
    })
};