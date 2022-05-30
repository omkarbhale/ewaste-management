const express = require('express');
const app = express();

app.get('/index.html', (req, res, next) => {
    res.send('Test route works!');
})

app.use(express.static('./public'))

app.listen(3000, () => {
    console.log("Listening on 3000...");
})