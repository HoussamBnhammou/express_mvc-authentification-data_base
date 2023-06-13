const express = require('express')

const route= express.Router()

const handle_refreshToken = require('../../controllers/refreshToken.js')


route.get('/', handle_refreshToken )






module.exports = route