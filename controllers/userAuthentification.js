const fspromises= require('fs').promises
const bcrypt = require('bcrypt')
const userDB = {
    users : require ('../model/userDB.json'),
    setUsers :  function (data) {this.users = data}}
const path =require ('path')



const registerHandling = async (req, res) => {
 const {username, pwd} = req.body
 if (!username || !pwd) {return res.status(400).json({'message': 'username and password both required'})}
 const duplicate = userDB.users.find(user => user.username === username)
 if (duplicate) {return res.sendstatus(409)}
 
        
 try{
 const hashedpwd = await bcrypt.hash(pwd, 10)
 const newUser = {'username' : username, 'pwd': hashedpwd, 'roles' : {'user' : 2000}}
 userDB.setUsers([...userDB.users, newUser])
 await fspromises.writeFile(path.join(__dirname, '..', 'model', 'userDB.json'), JSON.stringify(userDB.users))
 console.log(userDB)
 res.status(201).json({'success' : 'new account created'})

 }catch(err){
    res.status(500).json({'message' : err.message})
 }
}


module.exports = registerHandling