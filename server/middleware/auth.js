const db = require("../models");
const Users = db.users

module.exports = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.session.userId)
        if (user) {req.user = user; return next()}
    
        res.sendStatus(401)
    } catch (err) {
        next(err)        
    }
}