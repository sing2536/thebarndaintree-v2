const db = require("../models");
const Bookings = db.bookings

module.exports = async (req, res, next) => {
    try {
        const id = req.query.bookingId || req.params.id
        if (id === undefined) return next('ID not specified')
        const propertiesAccess = await req.user.getProperties()
        const booking = await Bookings.findByPk(id) 
        if (!booking) return next('Booking not found')

        if (propertiesAccess.find(x => booking.propertyId === x.id)) {req.booking = booking; return next()}

        next("You don't have access to the booking requested")
    } catch(err) {
        res.status(400).send(err)
    }
}