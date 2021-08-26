const router = require('express').Router()

router.post('/sign-up', (req, res, next) => {
    res.send('sign-up route')
});

router.post('/sign-in', (req, res, next) => {
    res.send('sign-in route')
});

router.post('/refresh-token', (req, res, next) => {
    res.send('refresh-token route')
});

router.delete('/log-out', (req, res, next) => {
    res.send('logout route')
});

module.exports = router;