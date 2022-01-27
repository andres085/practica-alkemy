const { Genre, Movie } = require('../config/db.config');

exports.create = async (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ error: 'Genre name its needed to create one' });
    }
    try {
        const newGenre = await Genre.create(req.body);
            res.status(200).send(newGenre);

    } catch (error) {
         res.status(500).send({
                message: 'Something went wrong when trying to create a genre'
            })
    }
    
}

exports.get = async (req, res) => {

    try {
        const foundGenres = await Genre.findAll({
            attributes: ['name', 'image'],
            include: [{
                model: Movie,
                as: 'movies',
                attributes: ['title', 'creation_date']
            }]
        });

        foundGenres ? res.status(200).send(foundGenres) : res.status(404).send({ error: 'Could not found any genre' });
        
    } catch (error) {
        res.status(500).send({
                message: 'Error retrieving genres'
            })
    }

}

exports.getOne = async(req, res) => {

    let id = req.params.id;

    try {
        const foundGenre = await Genre.findByPk(id, {
            attributes: ['name', 'image'],
            include: [{
                model: Movie,
                as: 'movies',
                attributes: ['title', 'creation_date']
            }]
        });

        foundGenre ? res.status(200).send(foundGenre) : res.status(404).send({ message: `Cannot find genre with id ${id}`});
        
    } catch (error) {
          res.status(500).send({
                message: `Error getting genres`
            })
    }

}

exports.update = async (req, res) => {

    let id = req.params.id;

    try {
        const foundGenre = await Genre.findByPk(id);

        if (foundGenre) {

            foundGenre.update(req.body);

            res.status(200).send({ message: `Genre with id ${id} updated successfully` })
        } else {
            return res.status(404).send({ message: `Cannot find genre with id ${id}`});
        }

    } catch (error) {
          res.status(500).send({
                message: `Error updating genres`
            })
    }
}

exports.delete = async (req, res) => {

    let id = req.params.id;

    try {
        const foundGenre = await Genre.findByPk(id);

        if (foundGenre) {
            
            foundGenre.destroy();

            res.status(200).send({ message: `Genre with id ${id} deleted successfully` })
        } else {
            return res.status(404).send({ message: `Cannot find genre with id ${id}`});
        }

    } catch (error) {
          res.status(500).send({
                message: `Error deleting genre`
            })
    }

}