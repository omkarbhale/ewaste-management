const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllProducts = async (req, res) => {
    const {category, minPrice, maxPrice} = req.query;
    const queryObject = {}

    if(category) {
        queryObject.category = category;
    }

    if(minPrice || maxPrice) queryObject.sellingPrice = {}
    if(minPrice) {
        queryObject.sellingPrice.$gte = minPrice
    }
    if(maxPrice) {
        queryObject.sellingPrice.$lte = maxPrice
    }
    if(minPrice && maxPrice && minPrice > maxPrice) {
        throw new BadRequestError(`Min price: ${minPrice} cannot be greater then Max price: ${maxPrice}`)
    }

    const products = await Product.find(queryObject)
    res.status(StatusCodes.OK).json({ query: queryObject, numHits: products.length, products })
}

const getProduct = async (req, res) => {
    const userId = req.user.userId
    const productId = req.params.id

    const product = await Product.findOne({
        _id: productId,
    })
    if(!product) {
        throw new NotFoundError(`No product with ID ${productId}`)
    }
    res.status(StatusCodes.OK).json({product})
}

const createProduct = async (req, res) => {
    req.body.createdBy = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}

const deleteProduct = async (req, res) => {
    const product = await Product.deleteOne({
        _id: req.params.productId
    })
    if(!product) {
        throw new NotFoundError(`No product with ID ${productId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct
}