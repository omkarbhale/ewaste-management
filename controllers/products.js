const Product = require('../models/Product')
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors');

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
    res.status(StatusCodes.OK).json({ numHits: products.length, products })
}

const getProduct = async (req, res) => {
    const userId = req.user.userId
    const productId = req.params.id

    const product = await Product.findOne({
        _id: productId,
    }).populate('createdBy')
    if(!product) {
        throw new NotFoundError(`No product with ID ${productId}`)
    }
    delete product['createdBy']['password']
    res.status(StatusCodes.OK).json({product})
}

const createProduct = async (req, res) => {
    req.body.createdBy = req.user.userId
    const product = await Product.create(req.body)
    const response = await User.updateOne({
        _id: req.user.userId
    }, {
        $push: {
            createdProducts: product._id
        }
    })
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

const addToCart = async (req, res) => {
    const { user } = req;
    if(!req.body.productId) {
        throw new BadRequestError('Please provide product ID')
    }
    const queryObject1 = {
        _id: user.userId
    }
    const queryObject2 = {
        $push: { cartProducts: req.body.productId }
    }
    console.log(queryObject1);
    console.log(queryObject2);
    const response = await User.updateOne(queryObject1, queryObject2)
    console.log(response)
    res.status(StatusCodes.CREATED).json(response)
}

const getCartProducts = async (req, res) => {
    const {user} = req;
    const response = await User.findById(user.userId).populate('cartProducts')
    res.status(StatusCodes.OK).json({products: response.cartProducts})
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    addToCart,
    getCartProducts
}