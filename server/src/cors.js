const cors = require('cors')
const options = {origin: 'http://localhost:5173', credentials: true}


module.exports = (app) => {
    app.options(cors(options))
    app.use(cors(options))
}