const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication invalid')
	}
	const token = authHeader.split(' ')[1]

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET)

		// make sure user exists, and is not deleted
		const user = await User.findOne({ email: payload.email })
		if(!user) {
			throw new UnauthenticatedError(`User does not exist anymore`)
		}

		// attach the user to the job routes
		req.user = { userId: payload.userId, name: payload.name, email: payload.email }
		next()
	} catch (error) {
		throw new UnauthenticatedError('Authentication invalid')
	}
}

module.exports = auth
