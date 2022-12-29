const db = require("../models");
const { Op } = require("sequelize");
const Sequelize = db.Sequelize
const PasswordResets = db.passwordResets

module.exports = async (req, res, next) => {
    try {
        const passwordReset = await PasswordResets.findOne({where: {token: req.query.token}})
        if (passwordReset) {
            const passwordResetLatest = await PasswordResets.findOne({
                where: [
                    {userId: passwordReset.userId},  
                    {createdAt: {[Op.gt]: Sequelize.literal('(NOW() - INTERVAL 24 HOUR)')}}
                ],
                order: [['id', 'desc']],
            })
            if (passwordResetLatest && passwordReset.id == passwordResetLatest.id && !passwordReset.consumed) {
                req.passwordReset = passwordReset
                next()
                return
            }
        }

        res.redirect(process.env.SERVER_DOMAIN+'password-reset-invalid')
    } catch(err) {
        next(err)
    }
}