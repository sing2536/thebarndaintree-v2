const db = require("../models");
const Users = db.users
const Properties = db.properties
const router = require("express").Router();
const auth = require('../middleware/auth')
const hasProperties = require('../middleware/hasProperties');
const demoRestrict = require("../middleware/demoRestrict");

module.exports = app => {
    router.post("/", demoRestrict, async (req, res, next) => {
        try {
            await req.user.createProperty(req.body)
            res.send()
        } catch(err) {
            next(err)
        }
    })

    router.patch("/", demoRestrict, hasProperties, async (req, res, next) => {
        try {
            await Properties.update(req.body, {where: {id: req.body.id}})
            res.send()
        } catch(err) {
            next(err)
        }
    })

    router.get("/", async (req, res, next) => {
        try {
            const properties = await req.user.getProperties()
            res.send(properties)
        } catch(err) {
            next(err)
        }
    })

    app.use('/properties', auth, router);
};