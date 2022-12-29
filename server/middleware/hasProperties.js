const db = require("../models");
const Properties = db.properties

module.exports = async (req, res, next) => {
    try {
        let properties
        if (req.method === 'GET') properties = req.query.properties
        if (req.method === 'POST' || req.method === 'PATCH') properties = req.body.propertyId || req.body.id
        if (properties === undefined) return next('Properties not specified')
        properties = properties.toString().split(',')
        const propertiesAccess = await req.user.getProperties()
        if (properties.every(x => propertiesAccess.find(y => parseInt(x) === y.id))) return next()
        next("You don't have access to one or more properties requested")
    } catch(err) {
        next(err)
    }
}