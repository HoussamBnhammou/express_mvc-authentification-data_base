const fspromises = require('fs').promises
const uuid = require('uuid').v4
const path = require('path')
const format = require('date-fns')
const fs = require('fs')



const logevent = async (message, logname) => {
    const date = format(new Date, 'yyyyMMdd\HH:mm:ss')
    const uuid = uuid()
    try{
   if(!fs.existsSync(path.join(__dirname, '..', 'logs1'))){fs.mkdir(path.join(__dirname, '..', 'logs1'))}

   await fspromises.appendFile(`${message}\t${uuid}\t${date}`, path.join(__dirname, '..', 'logs1', logname))
}catch(err){
 console.log(err)
}


}


const logger = async (req, res, next) => {
    try{
        const reqevent =logevent(`${req.method} \t ${'' || req.user} \t ${req.url}`)
        console.log(reqevent)
    }catch(err){
        console.log(err)
    }
}