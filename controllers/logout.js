const fspromises = require('fs').promises
const jwt = require('jsonwebtoken')
require('dotenv').config()
path = require('path')

userDb = {
    "users" : require('../model/userDB.json'),
    "setUsers" : function (data)  {this.users = data}
}





const logoutHandler = async (req, res) => {

    const cookie = req.cookies
    
    
    if(!cookie?.jwt){return res.sendStatus(201)}
    const refresh_token = cookie.jwt
    const founduser= userDb.users.find((user) => user.refresh_token === refresh_token) 
    
    if (!founduser){return res.sendStatus(201)}

    
            
    const otherusers = userDb.users.filter((user) => user !== founduser)
    const logoutuser = {...founduser, 'refresh_token' : ""}

    userDb.setUsers([...otherusers, logoutuser])
    

            
            
      
    await fspromises.writeFile(path.join(__dirname, '..', 'model', 'userDB.json'), JSON.stringify(userDb.users))
    res.clearcookie('jwt',{httpOnly : true})
    res.sendStatus(201)


}

module.exports = logoutHandler