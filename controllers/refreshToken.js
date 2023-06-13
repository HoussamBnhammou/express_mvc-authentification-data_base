const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

userDb = {
    "users" : require('../model/userDB.json'),
    "setUser" : (data) => this.users = data
}





const handle_refreshToken = async (req, res) => {

    const cookie = req.cookies
    
    console.log(cookie.jwt)
    if(!cookie?.jwt){return res.sendStatus(403)}
    const refresh_token = cookie.jwt
    const founduser= userDb.users.find((user) => user.refresh_token === refresh_token) 
    console.log(founduser)
    if (!founduser){return res.sendStatus(403)}

    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN,
        (err, decoded) => {
            if(err) {return res.sendStatus(403)}
            const 
            access_token = jwt.sign(
                {'userinfo':
                {'username' : founduser.username,
                'roles' : founduser.roles}},
                process.env.ACCESS_TOKEN,
                {"expiresIn": '200s'}
            )

            res.json({access_token})

        }
    )



}

module.exports = handle_refreshToken