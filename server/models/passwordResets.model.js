module.exports = (sequelize, Sequelize) => {
  const PasswordResets = sequelize.define("passwordResets", {
    token: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true
    },
    consumed: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    indexes: [{ unique: true, fields: ["token"] }]
  })

  return PasswordResets;
};