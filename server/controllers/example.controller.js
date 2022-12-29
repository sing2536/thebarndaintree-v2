const db = require("../models");
const Bookings = db.bookings
const BookingsHistory = db.bookingsHistory

exports.findAll = async (req, res) => {
  const original = await Bookings.findByPk(req.params.id, {attributes: {exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt']}})
  if (!original) return res.sendStatus(404)

  await BookingsHistory.create({...original.dataValues, bookingId: parseInt(req.params.id)})
  await Bookings.update(req.body, {where: {id: req.params.id}})
};