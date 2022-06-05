const express = require('express')

const router = express.Router()
const {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    addToCart,
    getCartProducts
} = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)
router.route('/cart').post(addToCart).get(getCartProducts)
router.route('/:id').get(getProduct).delete(deleteProduct)

module.exports = router
