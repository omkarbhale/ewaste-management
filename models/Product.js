const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide product title'],
            maxlength: 50,
        },
        category: {
            type: String,
            required: [true, 'Please provide category'],
            maxlength: 100,
            enum: {
                values: [
                    'category1',
                    'category2',
                    'category3',
                    // All categories here
                ],
                message: '{VALUE} is not supported'
            }
        },
        description: {
            type: String,
            required: [true, 'Please provide description']
        },
        sellingPrice: {
            type: Number,
            required: [true, 'Please provide a price']
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
