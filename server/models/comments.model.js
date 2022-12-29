const { notEmpty } = require('../src/validatorMessages')

module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Comment'+notEmpty
        },
        notEmpty: {
          msg: 'Comment'+notEmpty
        },
      }
    },
  })

  return Comments;
};