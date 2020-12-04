const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const { requireLogin } = require('../middlewares/requireLogin')

router.get('/customer/', requireLogin, createCustomerController)

router.get('/customer/:idCustomer', requireLogin, createCustomerController)
router.get('/customer/:idCustomer/contact/', requireLogin, createContactController)
router.get('/customer/:idCustomer/contact/:idContact', requireLogin, createContactController)

router.post('/customer/create', requireLogin, createCustomerController)
router.post('/customer/:idCustomer/contact/create', requireLogin, createContactController)

router.delete('/customer/:idCustomer/delete', requireLogin, createCustomerController)
router.delete('/customer/:idCustomer/contact/:idContact/delete', requireLogin, createContactController)

router.patch('/customer/:idCustomer/update', requireLogin, createCustomerController)
router.patch('/customer/:idCustomer/contact/:idContact/update', requireLogin, createContactController)

module.exports = router
