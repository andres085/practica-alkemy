const Sequelize = require('sequelize');
const { Movie, Character } = require('../config/db.config');
const Op = Sequelize.Op;


exports.create = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({ error: 'Movie title its needed to create one' });
    }
    try {
        const newMovie = await Movie.create(req.body);
            res.status(200).send(newMovie);

    } catch (error) {
         res.status(500).send({
                message: 'Something went wrong when trying to create a movie'
            })
    }
}

exports.get = async (req, res) => {

    const title = req.query.title;
    const genre = req.query.genre;
    const order = req.query.order;

    let orderBy = order ? ['creation_date', order] : ['id', 'ASC']; 

    try {
        if (title) {
            const moviesFound = await Movie.findAll({
                where: {title},
                attributes: ['title', 'image', 'creation_date'],
                order: [
                    orderBy
                ],
            });

            moviesFound.length !== 0 ? res.status(200).send(moviesFound) : res.status(404).send({ error: 'Movies not found' }) 

        }
        if (genre) {
            const moviesFound = await Movie.findAll({
                where: {genreId: genre},
                attributes: ['title', 'image', 'creation_date'],
                order: [
                    orderBy
                ],
            });

            moviesFound.length !== 0 ? res.status(200).send(moviesFound) : res.status(404).send({ error: 'Movies not found' }) 

        } else {
            const moviesFound = await Movie.findAll({
                attributes: ['title', 'image', 'creation_date'],
                order: [
                    orderBy
                ],
            });
            moviesFound.length !== 0 ? res.status(200).send(moviesFound) : res.status(404).send({ error: 'Movies not found' }) 
        }   
    
        
    } catch (error) {
         res.status(500).send({
                message: 'Error retrieving movies'
            })
    }
}

exports.getOne = async(req, res) => {

    let id = req.params.id;

    try {

        const movieFound = await Movie.findByPk(id, {
            attributes: ['title', 'image', 'creation_date'],
            include: {
                    model: Character,
                    as: 'characters',
                    through: {
                        attributes: []
                    },
                    attributes: ['image', 'name' ]
                }
        })
        
        movieFound ? res.status(200).send(movieFound) : res.status(404).send({ error: 'Movie not found' });
        
    } catch (error) {
         res.status(500).send({
                message: 'Error retrieving movie'
            })
    }

}

exports.update = async (req, res) => {

    let id = req.params.id;

    try {
        const movieFound = await Movie.findByPk(id);

        if (movieFound) {

            movieFound.update(req.body);

            res.status(200).send({ message: `Movie with id ${id} updated successfully` })
        } else {
            return res.status(404).send({ message: `Cannot find movie with id ${id}`});
        }

    } catch (error) {
          res.status(500).send({
                message: `Error updating movie`
            })
    }
}

exports.delete = async (req, res) => {

    let id = req.params.id;

    try {
        const foundMovie = await Movie.findByPk(id);

        if (foundMovie) {
            
            foundMovie.destroy();

            res.status(200).send({ message: `Movie with id ${id} deleted successfully` })
        } else {
            return res.status(404).send({ message: `Cannot find movie with id ${id}`});
        }

    } catch (error) {
          res.status(500).send({
                message: `Error deleting movie`
            })
    }
}