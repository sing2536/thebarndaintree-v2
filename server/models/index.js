const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  timezone: dbConfig.timezone,
  dialectOptions: dbConfig.dialectOptions,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },

  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bookings = require("./bookings.model.js")(sequelize, Sequelize);
// db.bookingsHistory = require("./bookingsHistory.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);
db.receipts = require("./receipts.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.properties = require("./properties.model.js")(sequelize, Sequelize);
db.passwordResets = require("./passwordResets.model.js")(sequelize, Sequelize);

// db.bookingsHistory.belongsTo(db.bookings)
// db.bookings.hasMany(db.bookingsHistory, { as: 'bookingsHistory'})

db.comments.belongsTo(db.bookings)
db.bookings.hasMany(db.comments)

db.receipts.belongsTo(db.bookings)
db.bookings.hasMany(db.receipts)

db.bookings.belongsTo(db.properties)
db.properties.hasMany(db.bookings)

db.properties.belongsTo(db.users)
db.users.hasMany(db.properties)

db.passwordResets.belongsTo(db.users)
db.users.hasMany(db.passwordResets)

module.exports = db;