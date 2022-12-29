const { notEmpty } = require('../src/validatorMessages')

module.exports = (sequelize, Sequelize) => {
  const Properties = sequelize.define("properties", {
    name: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Property name'+notEmpty
        },
        notEmpty: {
          msg: 'Property name'+notEmpty
        },
      }
    },
    businessId: {
      type: Sequelize.TEXT('tiny'),
    },
    email: {
      type: Sequelize.TEXT('tiny'),
    },
    phone: {
      type: Sequelize.TEXT('tiny'),
    },
  })

  return Properties;
};