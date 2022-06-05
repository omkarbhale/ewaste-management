const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'products.html'));
})

router.get('/products/:abcd', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public', 'html', 'products.html'));
})

router.get('/items/:any', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'items.html'))
})

module.exports = router