const express = require('express')

const router = express.Router()
const {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct
} = require('../controllers/products')

router.route('/').post(createProduct).get(getAllProducts)

// router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateJob)
router.route('/:id').get(getProduct).delete(deleteProduct)

module.exports = router
