const token = require('jsonwebtoken')
require('dotenv').config()


const verifytoken = async(req, res, next) => {
    const requested_header = req.headers['authorization']
    if(!requested_header){return res.sendStatus(401)}
    const requestedToken = requested_header.split(" ")[1]
    token.verify(requestedToken, process.env.ACCESS_TOKEN,
        (err, decode) => {
            if (err) {return res.sendStatus(401)}
            
                req.user = decode.userinfo.username 
                req.roles = decode.userinfo.roles 
                next()
            

        })
}


module.exports= verifytoken