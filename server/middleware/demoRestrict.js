const db = require("../models");

module.exports = async (req, res, next) => {
    try {
        if (req.session.demo) return next('Action retricted as this is a demo account.')
        next()
    } catch (err) {
        next(err)
    }
}