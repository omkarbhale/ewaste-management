const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
	const user = await User.create({ ...req.body })
	const token = user.createJWT()
	res.status(StatusCodes.CREATED).json({ user: { name: user.name, email: user.email }, token })
}

const login = async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password')
	}
	const user = await User.findOne({ email })
	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials')
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials')
	}
	// compare password
	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user: { name: user.name, email: user.email }, token })
}

// Only for testing purposes
// Will delete all associated products in production releases (if delete functionality is implemented)
const del = async (req, res) => {
	const {email} = req.body
	if(!(email == req.user.email)) {
		throw new BadRequestError('Can only delete your account')
	}
	const response = await User.deleteOne({
		email: email
	})
	res.status(StatusCodes.OK).json(response)
}

module.exports = {
	register,
	login,
	del
}
