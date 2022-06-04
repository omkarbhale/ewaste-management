require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json())

app.use(express.static('./public'))
app.use(express.static('./public/html'))

app.get('/api', (req, res) => {
    res.send('<h1>E-Waste Management API</h1><a href="/">Visit website</a>');
})
app.use('/api/auth', authRouter)
app.use('/api/products', authenticateUser, productsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is listening on port ${process.env.PORT || 3000}`);
        })
    } catch(error) {
        console.log(error);
    }
}
start()