module.exports = (sequelize, Sequelize) => {
  const BookingHistory = sequelize.define("bookingsHistory", require("../src/bookings.model")(sequelize, Sequelize), {freezeTableName: true})

  return BookingHistory;
};