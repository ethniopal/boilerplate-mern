const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const { requireLogin } = require('../middlewares/requireLogin')
const { signUpController, signInController } = require('../controllers/authController')

router.get('/', (req, res) => {
	// require('../emails/config')
	res.send('home')
})

router.post('/signup', signUpController)

router.post('/signin', signInController)

module.exports = router
