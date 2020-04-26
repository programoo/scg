const express = require('express');
const router = express.Router();

router.get('/webhook', (req, res) => {
    console.log("I saw line message here on GET");
    res.send("<h1>Hello Line Messaging Developer</h1>");
})

module.exports = router;