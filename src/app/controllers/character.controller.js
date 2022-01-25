const Sequelize = require('sequelize');
const { Character } = require('../config/db.config');
const Op = Sequelize.Op;


exports.create = (req, res) => {
    
    Character.create(req.body)
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
    const name = req.query.name;
    const age = req.query.age;

    let condition = name ? { name: { [Op.like]: `%${name}%` } } : age ? { age: { [Op.like]: `%${age}%` } } : null;

    Character.findAll({
        where: condition,
        include: 'movies',
        attributes: {exclude: ['id', 'age', 'weight', 'story', 'createdAt', 'updatedAt']},
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving all the characters'
            })
        })
}

exports.getOne = (req, res) => {

    let id = req.params.id;

    Character.findByPk(id, {include: 'movies'})
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

    Character.update(req.body, {
            where: {
                id: id
            }
        })
        .then(data => {
            if (data == 1) {
                res.send({
                    message: `Character with id ${id} updated successfully`
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

    Character.destroy({
        where: {id: id}
    }).then(data => {
            if (data == 1) {
                res.send({
                    message: `Character with id ${id} deleted successfully`
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