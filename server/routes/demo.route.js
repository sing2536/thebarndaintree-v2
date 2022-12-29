const db = require("../models");
const Users = db.users
const router = require("express").Router();

module.exports = app => {
    router.get('/', async (req, res, next) => {
        try {
            const user = await Users.findOne({where: {email: 'demo@myguests.app'}})
            if (!user) return next('Demo account currently not available, please try again later.')

            req.session.regenerate(() => { //important to not override session with demo or other accounts
                req.session.userId = user.id
                req.session.demo = true
                res.redirect(process.env.SERVER_DOMAIN)
            })
        } catch (err) {
            next(err)
        }
    })

    app.use('/demo', router);
};