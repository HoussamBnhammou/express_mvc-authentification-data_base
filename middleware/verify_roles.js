





const verify_roles = (...allroles) => {
    return (req, res, next) => {
        if (!req?.roles){res.sendStatus(401)}
        const roles = req.roles
        console.log(roles)
        const rolevalues =[...allroles]
        console.log(rolevalues)
        const results  = [rolevalues.some(value => Object.values(roles).includes(value))]

        console.log(results)
        if(!results.some(val => val === true)){return res.sendStatus(401)}
        next()

    }
}


module.exports = verify_roles