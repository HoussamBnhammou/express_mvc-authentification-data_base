const registerHandling =require ('../../controllers/userAuthentification')
const express = require('express')
const route = express.Router()


route.post('/', registerHandling)
        



module.exports = route
    