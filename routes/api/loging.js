const express = require('express')
const route = express.Router()
const loginHandling = require('../../controllers/userLogin')


route.get('/', loginHandling)

module.exports = route