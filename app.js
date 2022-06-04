require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

app.use(express.static('./public'))
app.use(express.static('./public/html'))

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