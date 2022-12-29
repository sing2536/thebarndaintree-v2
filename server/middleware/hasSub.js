const db = require("../models");
const Users = db.users

module.exports = async (req, res, next) => {
    try {
        if (req.user.status === 1) return next()
        next('Action retricted due to inactive subscription, please subscribe to lift it.')
    } catch (err) {
        next(err)
    }
}