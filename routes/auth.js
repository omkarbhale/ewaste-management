const express = require('express')
const router = express.Router()

const { register, login, del } = require('../controllers/auth')
const authenticateUser = require('../middleware/authentication');

router.post('/register', register)
router.post('/login', login)
router.post('/delete', authenticateUser, del);

module.exports = router
