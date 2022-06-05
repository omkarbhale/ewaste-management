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

router.get('/mycart', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'mycart.html'))
})

router.get('/postad', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'postad.html'))
})

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'about.html'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'login.html'))
})

module.exports = router