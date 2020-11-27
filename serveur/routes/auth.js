const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const { requireLogin } = require('../middlewares/requireLogin')

router.get('/', (req, res) => {
	// require('../emails/config')
	res.send('home')
})

router.get('/protected', requireLogin, (req, res) => {
	res.send('hello user')
})

router.post('/signup', (req, res) => {
	const { name, email, password } = req.body
	if (!name || !email || !password) {
		return res.status(422).json({ error: 'please fill all fields' })
	}

	User.findOne({ email: email })
		.then(savedUser => {
			if (savedUser) {
				return res.status(422).json({ error: 'user already exists with that email' })
			}

			bcrypt.hash(password, 12).then(hashedPassword => {
				const user = new User({
					name,
					email,
					password: hashedPassword
				})
				user.save()
					.then(user => {
						res.json({ message: 'saved successfully' })
					})
					.catch(err => console.log(err))
			})
		})
		.catch(err => console.log(err))
})

router.post('/signin', (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(422).json({ error: 'please add email or password' })
	}

	User.findOne({ email: email })
		.then(savedUser => {
			if (!savedUser) {
				return res.status(422).json({ error: 'Invalid email or password' })
			}
			bcrypt
				.compare(password, savedUser.password)
				.then(doMatch => {
					if (doMatch) {
						const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, { expiresIn: '300d' })
						return res.json({ token })
						// res.json({ message: 'Successfully signed in' })
					} else {
						return res.status(422).json({ error: 'Invalid email or password' })
					}
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
})

module.exports = router
