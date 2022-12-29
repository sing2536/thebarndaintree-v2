const { notEmpty } = require('../src/validatorMessages')

module.exports = (sequelize, Sequelize) => {
  const receipts = sequelize.define("receipts", {
    amountReceived: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Amount'+notEmpty
        },
        isNumeric: {
          msg: 'Amount must be a numeric.'
        },
        min: {
          args: 0.01,
          msg: 'Amount must be greater than 0.'
        },
      }
    },
  })

  return receipts;
};