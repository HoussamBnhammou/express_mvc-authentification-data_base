const express = require('express')
const route = express.Router()
const logoutHandler = require('../../controllers/logout.js')



route.get('/', logoutHandler)


module.exports = route