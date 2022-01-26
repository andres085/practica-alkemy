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
    const order = req.query.order;

    let condition = title ? { title: { [Op.like]: `%${title}%` } } : genre ? { genreId: { [Op.like]: `%${genre}%` } } : null;
    let orderBy = order ? ['creation_date', order] : ['id', 'ASC']; 

    console.log(orderBy);

    Movie.findAll({
        where: condition,
        include: 'characters',
        attributes: { exclude: ['id', 'rate', 'createdAt', 'updatedAt', 'genreId'] },
        order: [
            orderBy
        ],
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

    Movie.findByPk(id, {include: 'characters'})
        .then(data => {
            data ? res.send(data) : res.status(404).send({
                message: `Cannot find movie with id ${id}` 
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `Error getting movie with id ${id}`
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
                    message: `Cannot update movie with id ${id}, not found or body it's empty`
                })
            }
        })
        .catch(err => {
             res.status(500).send({
                message: `Error updating movie with id ${id}`
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
                    message: `Cannot delete movie with id ${id}, not found`
                })
            }
        })
        .catch(err => {
             res.status(500).send({
                message: `Error deleting movie with id ${id}`
            })
        })
}