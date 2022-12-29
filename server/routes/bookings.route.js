const db = require("../models");
const { Op } = require("sequelize");
const Bookings = db.bookings
const Properties = db.properties
const router = require("express").Router();
const bookingUpdate = require('../src/bookingUpdate')
const auth = require('../middleware/auth')
const hasProperties = require('../middleware/hasProperties')
const hasSub = require('../middleware/hasSub');
const demoRestrict = require("../middleware/demoRestrict");
const getQueryParams = () => {
    return {
        include: [{
                model: db.receipts,
                attributes: ['id', 'amountReceived', 'createdAt'],
                // separate: true,
                // order: [['id', 'desc']]
            }, {
                model: db.comments,
                attributes: ['id', 'message', 'createdAt'],
                // separate: true,
                // order: [['id', 'desc']]
            }, {
                model: db.properties,
                attributes: ['id', 'name'],
        }],
        order: [
            ['id', 'desc'],
            [db.receipts, 'id', 'desc'],
            [db.comments, 'id', 'desc'],
        ],
    }
}

module.exports = app => {
    router.post("/", demoRestrict, hasSub, async (req, res, next) => {
        try {
            req.body.owing = req.body.quote
            const property = await Properties.findByPk(req.body.propertyId)
            const booking = await property.createBooking(req.body)
            if (req.body.comment) await booking.createComment({message: req.body.comment})
            res.send(await Bookings.findByPk(booking.id, getQueryParams()))
        } catch(err) {
            next(err)
        }
    })

    router.patch("/:id", demoRestrict, hasSub, async (req, res, next) => {
        try {
            await bookingUpdate(req, res)
            res.send(await Bookings.findByPk(req.params.id, getQueryParams()))
        } catch(err) {
            next(err)
        }
    })

    // router.get("/history/:id", async (req, res) => {
    //     try {
    //         const histories = await BookingsHistory.findAll({where: {bookingId: req.params.id}, order: [['id', 'desc']]})
    //         if (!histories) res.sendStatus(404)

    //         res.send(histories)
    //     } catch(err) {
    //         res.status(400).send(err)
    //     }
    // })

    router.get("/", async (req, res, next) => {
        try {
            let filter = getQueryParams()
            let limit = 30
            let countQuery = {where: {}}
            filter.where = {}
            switch (req.query.filter) {
                case '1':
                    filter.where.status = {[Op.or]: [1, 2, 3]}
                    filter.order[0] = ['checkIn', 'asc']
                    break;
            }
    
            filter.where.propertyId = {[Op.or]: req.query.properties.split(',')}
            filter.limit = limit
            filter.offset = (req.query.page-1) * limit
            countQuery.where = filter.where
            res.send({rows: await Bookings.findAll(filter), count: await Bookings.count(countQuery)})
        } catch (err) {
            next(err)
        }
    })

    router.get("/calendar", async (req, res, next) => {
        try {
            let { year, properties } = req.query
            let betweenDates = [new Date(year+'-01-01'), new Date(year+'-12-31')]

            if (!year || !properties) return res.status(400).send({})

            res.send(await Bookings.findAll({
                attributes: ['id', 'status', 'name', 'checkIn', 'checkOut', 'propertyId'],
                where: {
                    propertyId: {[Op.or]: properties.split(',')},
                    status: {[Op.or]: [1, 2, 3, 4, 6]},
                    [Op.or]: [
                        {checkIn: {[Op.between]: betweenDates}},
                        {checkOut: {[Op.between]: betweenDates}},
                    ]
                }
            }))
        } catch(err) {
            next(err)
        }
    })

    router.get("/search", async (req, res, next) => {
        try {
            const { query, properties } = req.query
            const where = {where: {
                propertyId: properties.split(','),
                [Op.or]: [
                    {name: {[Op.like]: `%${query}%`}},
                    {email: {[Op.like]: `%${query}%`}},
                    {phone: {[Op.like]: `%${query}%`}},
                    {'$comments.message$': {[Op.like]: `%${query}%`}}
                ],
            }, limit: 100, subQuery: false}
    
            res.send(await Bookings.findAll({...getQueryParams(), ...where}))
        } catch(err) {
            next(err)
        }
    })

    router.get("/:id", async (req, res, next) => {
        try {
            const booking = await Bookings.findByPk(req.params.id, getQueryParams())
            if (!booking) return res.sendStatus(404)
    
            res.send(booking)
        } catch (err) {
            next(err)            
        }
    })

    app.use('/bookings', auth, hasProperties, router);
};