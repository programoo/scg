const express = require('express');
const router = express.Router();

/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect("/profiles")
});

router.get('/hello', (req, res, next) => {
    res.send("<h1>Server is running.</h1>");
})

module.exports = router;