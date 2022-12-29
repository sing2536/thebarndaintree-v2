const db = require("../models");
const router = require("express").Router();
const Properties = db.properties

module.exports = app => {
    router.get("/bookings", async (req, res, next) => {
            const property = await Properties.findByPk(1)
            for (let i = 13; i < 100000; i++) {
                console.log(i);
                await property.createBooking({
                    status: 0,
                    checkIn: '2022-01-01',
                    checkOut: '2022-01-05',
                    name: 'test',
                })
            }
            res.send()
    })

    app.use('/tests', router);
};