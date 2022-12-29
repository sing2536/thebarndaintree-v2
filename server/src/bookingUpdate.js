const db = require("../models");
const Bookings = db.bookings
const BookingsHistory = db.bookingsHistory

module.exports = async (req, res) => {
    const booking = await Bookings.findByPk(req.params.id)
    if (!booking) return res.sendStatus(404)

    // let changesFound
    // for (let key of Object.keys(req.body)) {
    //     if (booking.dataValues[key] !== undefined && req.body[key] != booking.dataValues[key]) changesFound = true
    // }

    // if (!changesFound) return

    // const keysToRemove = ['id', 'createdAt', 'updatedAt', 'deletedAt']
    // for (let key of keysToRemove) delete booking.dataValues[key]
    
    const updated = await Bookings.update(req.body, {where: {id: req.params.id}})
    // await BookingsHistory.create({...booking.dataValues, bookingId: req.params.id})
    return updated
}