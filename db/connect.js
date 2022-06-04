const mongoose = require('mongoose')

const connectDB = (url) => {
    // const db = mongoose.connection
    // db.once('open', () => console.log('Successfully connected to database'))
    // db.on('error', () => console.error.bind(console, 'conn error: '))
    return mongoose.connect(url)
}

module.exports = connectDB