const { CharacterMovie } = require('../config/db.config');

exports.create = (req, res) => {
    
    CharacterMovie.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}