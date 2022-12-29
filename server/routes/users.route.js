const db = require("../models");
const router = require("express").Router();
const auth = require('../middleware/auth')
const bcrypt = require("bcrypt");
const demoRestrict = require("../middleware/demoRestrict");
const passwordEncrypt = require("../src/passwordEncrypt");
const Users = db.users

module.exports = app => {
    router.post("/signup", async (req, res, next) => {
        try {
            req.body.password = await passwordEncrypt(req.body.password)
            req.body.email = req.body.email.trim()
            const user = await Users.create({
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                status: 1, //At first we will just give access to anyone who attempts a sign up.
            })

            req.session.regenerate(() => { //important to not override session with demo or other accounts
                req.session.userId = user.id
                res.send()
            })
        } catch(err) {
            next(err)
        }
    })

    router.post("/signin", async (req, res, next) => {
        try {
            const user = await Users.findOne({where: {email: req.body.email.trim()}})

            if (user) {
                const match = bcrypt.compareSync(req.body.password, user.password)
                if (match) {
                    req.session.regenerate(() => { //important to not override session with demo or other accounts
                        req.session.userId = user.id
                        res.send()
                    })
                }
            } else {
                res.sendStatus(401)
            }

        } catch(err) {
            next(err)
        }
    })

    router.get('/signout', auth, async (req, res, next) => {
        try {
            req.session.destroy()
            res.send()
        } catch(err) {
            next(err)
        }
    })

    router.patch('/change-password', auth, demoRestrict, async (req, res, next) => {
        try {
            const passwordCurrent = bcrypt.compareSync(req.body.passwordCurrent, req.user.password)
            if (!passwordCurrent) return next('Current password is incorrect.')
    
            await req.user.update({password: await passwordEncrypt(req.body.passwordNew)})
            res.send()
        } catch (err) {
            next(err)
        }
    })

    router.get('/', auth, async (req, res, next) => {
        try {
            const data = {
                status: req.user.status,
                userId: req.user.id,
            }
            if (req.session.demo) data.demo = true
            res.send(data)
        } catch (err) {
            next(err)
        }
    })

    app.use('/users', router);
};