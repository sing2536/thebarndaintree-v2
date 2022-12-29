const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express')
const app = express()
const db = require("./models");
const PORT = 3007
const errorHandler = require('./middleware/errorHandler')

db.sequelize.sync()
// db.passwordResets.sync({alter: true})
// db.users.sync({alter: true})

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/1gFhBs3OpwzX54vM') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

require('./src/sessionStore')(app)

//imported routes
require('./routes/bookings.route')(app)
require('./routes/comments.route')(app)
require('./routes/receipts.route')(app)
require('./routes/users.route')(app)
require('./routes/subscription.route')(app)
require('./routes/properties.route')(app)
require('./routes/passwordReset.route')(app)
require('./routes/tests.route')(app)
require('./routes/demo.route')(app)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})