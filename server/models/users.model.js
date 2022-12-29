const { notEmpty, emailNotValid, emailNotUnique, passwordLength } = require('../src/validatorMessages')
const passwordEncrpt = require('../src/passwordEncrypt')

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    firstName: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name'+notEmpty
        }
      },
    },
    lastName: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name'+notEmpty
        }
      }
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        isEmail: {
          msg: emailNotValid,
        },
        notEmpty: {
          msg: 'Email'+notEmpty
        },
        async isUnique() {
          const db = require("../models");
          const user = await db.users.findOne({where: {email: this.email}})
          if (user) throw new Error(emailNotUnique)
        }
      },
    },
    password: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password'+notEmpty,
        },
        len: {
          args: [8, 64],
          msg: passwordLength,
        },
      },
    },
    customerId: {
      type: Sequelize.TEXT('tiny'),
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: '0',
    },
  }, {
    indexes: [{ unique: true, fields: ["email"] }],
  })

  return Users;
};