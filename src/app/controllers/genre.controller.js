const { Genre } = require('../config/db.config');

exports.create = (req, res) => {
    
    Genre.create(req.body)
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

    Genre.findAll({include: 'movies'})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Error retrieving genres'
            })
        })
}

exports.getOne = (req, res) => {

    let id = req.params.id;

    Genre.findByPk(id, {include: 'movies'})
        .then(data => {
            data ? res.send(data) : res.status(404).send({
                message: `Cannot find genre with id ${id}` 
            })
        })
        .catch(err => {
            res.status(500).send({
                message: `Error getting genre with id ${id}`
            })
        })

}

exports.update = (req, res) => {

    let id = req.params.id;

    Genre.update(req.body, {
            where: {
                id: id
            }
        })
        .then(data => {
            if (data == 1) {
                res.send({
                    message: `Genre with id ${id} updated successfully`
                })
            } else {
                res.send({
                    message: `Cannot update genre with id ${id}, not found or body it's empty`
                })
            }
        })
        .catch(err => {
             res.status(500).send({
                message: `Error updating genre with id ${id}`
            })
        })
}

exports.delete = (req, res) => {

    let id = req.params.id;

    Genre.destroy({
        where: {id: id}
    }).then(data => {
            if (data == 1) {
                res.send({
                    message: `Genre with id ${id} deleted successfully`
                })
            } else {
                res.send({
                    message: `Cannot delete genre with id ${id}, not found`
                })
            }
        })
        .catch(err => {
             res.status(500).send({
                message: `Error deleting genre with id ${id}`
            })
        })
}