const notFound = (req, res) => res.status(404).send(`Route ${req.path} does not exist`)

module.exports = notFound
