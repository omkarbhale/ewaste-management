const express = require('express')

const router = express.Router()

router.get('/products', (req, res) => {
    res.sendFile('/public/html/products.html')
})

module.exports = router