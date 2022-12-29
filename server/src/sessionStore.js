const session = require('express-session');
const mysql2 = require('mysql2/promise');
const mysqlStore = require('express-mysql-session')(session);
const options = {
    connectionLimit: 1,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB,
    host: process.env.DB_HOST,
}

const connection = mysql2.createPool(options);
const sessionStore = new mysqlStore({createDatabaseTable: true}, connection)

module.exports = (app) => {
    app.use(session({
        resave: true,
        saveUninitialized: false,
        store: sessionStore,
        secret: process.env.SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 4, // 4 hours
            sameSite: true,
        }
    }))
}