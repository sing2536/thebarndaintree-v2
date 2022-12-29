const db = require("../models");
const Bookings = db.bookings
const router = require("express").Router();
const auth = require('../middleware/auth')
const hasBookings = require('../middleware/hasBookings');
const hasSub = require("../middleware/hasSub");
const demoRestrict = require("../middleware/demoRestrict");

module.exports = app => {
    router.post("/:id", demoRestrict, hasSub, hasBookings, async (req, res) => {
        try {
            const comment = await req.booking.createComment(req.body)
            res.send(comment)
        } catch(err) {
            res.status(400).send(err)
        }
    })

    app.use('/comments', auth, router);
};