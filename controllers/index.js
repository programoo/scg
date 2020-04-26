const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect("/profiles")
});

router.get('/hello', (req, res, next) => {
    res.send("<h1>Hello Javascript Developer</h1>");
})

module.exports = router;