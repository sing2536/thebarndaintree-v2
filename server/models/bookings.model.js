const { notEmpty } = require('../src/validatorMessages')

module.exports = (sequelize, Sequelize) => {
  const Bookings = sequelize.define("bookings", {
    name: {
      type: Sequelize.TEXT('tiny'),
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'Name'+notEmpty
      //   },
      //   notEmpty: {
      //     msg: 'Name'+notEmpty
      //   }
      // },
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Status'+notEmpty
        },
        notEmpty: {
          msg: 'Status'+notEmpty
        }
      },
    },
    checkIn: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Check in'+notEmpty
        },
        notEmpty: {
          msg: 'Check in'+notEmpty
        }
      },
    },
    checkOut: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Check out'+notEmpty
        },
        notEmpty: {
          msg: 'Check out'+notEmpty
        },
        isAfterCheckIn(value) {
          if (this.status == 6) return
          if (new Date(value).getTime() <= new Date(this.checkIn).getTime()) {
            throw new Error("Check out must be after check in")
          }
        },
        async dateNotOverlap(value) {
          if (this.bookingId) return
          if (this.status == 1 || this.status == 2 || this.status == 3) {
            const db = require("../models");
            const { Op } = require("sequelize");
            const Bookings = db.bookings
            const removeOneDay = (date) => {
              let x = new Date(date)
              x.setDate(x.getDate()-1) 
              return x.toISOString().substring(0, 10)
            }
            const addOneDay = (date) => {
              let x = new Date(date)
              x.setDate(x.getDate()+1)
              return x.toISOString().substring(0, 10)
            }
            const overlap = await Bookings.findOne({where: {[Op.and]: [
              {id: {[Op.ne]: this.id || null}},
              {propertyId: this.propertyId},
              {status: {[Op.or]: [1, 2, 3]}},
              {[Op.and]: [
                {checkOut: {[Op.gte]: addOneDay(this.checkIn)}},
                {checkIn: {[Op.lte]: removeOneDay(this.checkOut)}},
              ]}
            ]}})
            if (overlap) throw new Error("Dates overlap with another booking")
          }
        }
      }
    },
    adults: {
      type: Sequelize.INTEGER
    },
    children: {
      type: Sequelize.INTEGER
    },
    source: {
      type: Sequelize.INTEGER,
      // allowNull: false
    },
    quote: {
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0,
    },
    // ferry: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false
    // },
    phone: {
      type: Sequelize.TEXT('tiny')
    },
    email: {
      type: Sequelize.TEXT('tiny')
    },
  })

  return Bookings;
};