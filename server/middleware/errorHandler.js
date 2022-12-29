module.exports = async (err, req, res, next) => {
    try {
        res.status(400).send({error: err})
    } catch {
        console.log(err);
        res.status(500).send({error: 'Something went wrong'})
    }
}