const db = require("../models");
const Receipts = db.receipts

module.exports = async (req, res, next) => {
    try {
        const { id } = req.query
        if (id === undefined) return next('ID not specified')

        const receipt = await Receipts.findByPk(id)
        if (!receipt) return next('Not found')

        const booking = await receipt.getBooking();
        const propertiesAccess = await req.user.getProperties()
        if (propertiesAccess.find(x => booking.propertyId === x.id)) {req.receipt = receipt; return next()}

        return next("You don't have access to the receipt requested")

    } catch(err) {
        next(err)
    }
}