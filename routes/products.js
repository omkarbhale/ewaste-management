const express = require('express')

const router = express.Router()
const {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    addToCart
} = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)
router.route('/:id').get(getProduct).delete(deleteProduct)
router.route('/cart').post(addToCart)

module.exports = router
