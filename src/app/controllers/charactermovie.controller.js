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

exports.update = async (req, res) => {

    try {
        const charmovieFound = await CharacterMovie.findByPk(req.params.id);

        if (!charmovieFound) {
            return res.status(404).send({ error: 'Relationship not found' });
        }

        charmovieFound.update(req.body);
        res.status(200).send({
            message: 'Relation updated successfully'
        })
    } catch (error) {
         res.status(500).send({
            message: 'Something went wrong when trying to update relationship'
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const charmovieFound = await CharacterMovie.findByPk(req.params.id);

        if (!charmovieFound) {
            return res.status(404).send({ error: 'Relationship not found' });
        }

        charmovieFound.destroy();
        res.status(200).send({
            message: 'Relation deleted successfully'
        })
    } catch (error) {
         res.status(500).send({
            message: 'Something went wrong when trying to delete relationship'
        })
    }
}