const bcrypt = require('bcrypt')

const token = require('jsonwebtoken')
require('dotenv').config()
const cookie =require('cookie-parser')
const fspromises = require('fs').promises
const path= require('path')

const userDB = {
    users : require ('../model/userDB.json'),
    setUsers :  function (data) {this.users = data}}



const loginHandling = async (req, res) => {
    const {username , pwd} = req.body
    if (!username, !pwd) {return res.status(400).json({"message" : "unsername nad password both required"})}

    
    try{
    const user = userDB.users.find(user => user.username === username)
    if(!user) {return res.status(409).json({'message': 'username does not extst'})}

    const Passwordmatch = await bcrypt.compare(pwd, user.pwd)

    if(!Passwordmatch){return res.status(409).json({'message': 'password is wrong'})}
    
    refresh_token = token.sign(
        {'username' : user.username},
        process.env.REFRESH_TOKEN,
        {"expiresIn": '1d'}
    )

    access_token = token.sign(
        {'userinfo':
        {'username' : user.username,
        'roles' : user.roles}},
        process.env.ACCESS_TOKEN,
        {"expiresIn": '200s'}
    )

    const otherusers = userDB.users.filter(user1 => user1.username!==username)
    const myuser = {...user, 'refresh_token' : refresh_token }
    userDB.setUsers([...otherusers, myuser])
    await fspromises.writeFile(path.join(__dirname, "..", 'model', 'userDB.json'), JSON.stringify(userDB.users))
    res.cookie('jwt', refresh_token, {httpOnly : true, maxAge : 24 * 60 * 60 * 1000})
    
        

    console.log(user)
    return res.json({access_token})
     }catch(err){
        console.log(err)
        res.status(500)
    }
    


}



module.exports = loginHandling