const Sequelize = require('sequelize');
const { Movie } = require('../config/db.config');
const Op = Sequelize.Op;


exports.create = (req, res) => {
    
    Movie.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.get = (req, res) => {

    const title = req.query.title;
    const genre = req.query.genre;

    let condition = title ? { title: { [Op.like]: `%${title}%` } } : genre ? { genre: { [Op.like]: `%${genre}%` } } : null;

    Movie.findAll({
        where: condition,
        attributes: {exclude: ['id', 'rate', 'createdAt', 'updatedAt']},
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving movies'
            })
        })
}

exports.getOne = (req, res) => {

    let id = req.params.id;

    Movie.findByPk(id)
        .then(data => {
            data ? res.send(data) : res.status(404).send({
                message: `Cannot find character with id ${id}` 
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `Error getting character with id ${id}`
            })
        })

}

exports.update = (req, res) => {

    let id = req.params.id;

    Movie.update(req.body, {
            where: {
                id: id
            }
        })
        .then(data => {
            if (data == 1) {
                res.send({
                    message: `Movie with id ${id} updated successfully`
                })
            } else {
                res.send({
                    message: `Cannot update character with id ${id}, not found or body it's empty`
                })
            }
        })
        .catch(err => {
             res.status(500).send({
                message: `Error updating character with id ${id}`
            })
        })
}

exports.delete = (req, res) => {

    let id = req.params.id;

    Movie.destroy({
        where: {id: id}
    }).then(data => {
            if (data == 1) {
                res.send({
                    message: `Movie with id ${id} deleted successfully`
                })
            } else {
                res.send({
                    message: `Cannot delete character with id ${id}, not found`
                })
            }
        })
        .catch(err => {
             res.status(500).send({
                message: `Error deleting character with id ${id}`
            })
        })
}