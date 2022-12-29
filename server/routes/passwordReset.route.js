const db = require("../models");
const router = require("express").Router();
const crypto = require('crypto');
const hasPasswordReset = require('../middleware/hasPasswordReset')
const passwordEncrpt = require('../src/passwordEncrypt');
const { sendEmail } = require("../src/emailSender");
const demoRestrict = require("../middleware/demoRestrict");
const Users = db.users
const PasswordResets = db.passwordResets

async function tokenCreateHandler(user) {
    const token = await crypto.randomBytes(32)
    const duplicate = await PasswordResets.findOne({where: {token: token.toString('hex')}})

    if (duplicate) return tokenCreateHandler(user)

    await user.createPasswordReset({token: token.toString('hex')})

    sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: `Hi There,

Please follow the password reset link below to create a new password. This link will expire after 24 hours.

Link: ${process.env.SERVER_DOMAIN}api/password-reset?token=${token.toString('hex')}

Kind regards,
myguests support
`
    })
}

module.exports = app => {
    router.get("/", hasPasswordReset, async (req, res, next) => {
        try {
            res.redirect(process.env.SERVER_DOMAIN+'password-reset?token='+req.query.token)
        } catch(err) {
            next(err)
        }
    })

    router.patch("/", hasPasswordReset, async (req, res, next) => {
        try {
            const user = await req.passwordReset.getUser()
            await user.update({password: req.body.password})       
            await req.passwordReset.update({consumed: 1})  
            res.send()
        } catch(err) {
            next(err)
        }
    })

    router.post("/", async (req, res, next) => {
        try {
            const user = await Users.findOne({where: {email: req.body.email}})
            if (user) {
                tokenCreateHandler(user)
            }
            res.send()
        } catch(err) {
            next(err)
        }
    })

    app.use('/password-reset', router);
};