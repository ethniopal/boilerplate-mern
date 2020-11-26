const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const PORT = 5000

//connecto to BD
mongoose.connect(MONGOURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
	console.log('connected to mongo')
})

mongoose.connection.on('error', err => {
	console.log('Error connecting', err)
})

//lists of models
require('./models/index')

app.use(express.json())
app.use(require('./routes/auth'))

app.listen(PORT, () => console.log('server is running on ', PORT))
