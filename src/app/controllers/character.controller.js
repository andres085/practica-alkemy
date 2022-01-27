const Sequelize = require('sequelize');
const { Character, Movie} = require('../config/db.config');
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

exports.get = async (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    const movies = req.query.movies;

    try {
        if (name) {

            const characterFound = await Character.findAll({
                where: { name },
                attributes: ['image', 'name']
            });
         
            characterFound.length !== 0 ? res.status(200).send(characterFound) : res.status(404).send({ error: 'Error character not found' }) 

        }
        if (age) {
            const characterFound = await Character.findAll({
                where: { age },
                attributes: ['image', 'name'],
            });
         
            characterFound.length !== 0 ? res.status(200).send(characterFound) : res.status(404).send({ error: 'Error character not found' }) 
        }
        if (movies) {
            const characterFound = await Character.findAll({
                attributes: ['image', 'name'],
                include: {
                    model: Movie,
                    as: 'movies',
                    through: {
                        attributes: []
                    },
                    where: { id: movies },
                    attributes: ['image', 'title' ]
                }
            });

            characterFound.length !== 0 ? res.status(200).send(characterFound) : res.status(404).send({ error: 'Error character not found' }) 
        } else {

            const characters = await Character.findAll({
                attributes: ['image', 'name']
            })

            res.status(200).send(characters);
        }


    } catch (error) {
        res.status(500).send({ error: 'Could not find any characters' });
    }
}

exports.getOne = async (req, res) => {

    let id = req.params.id;

    try {

        const characterFound = await Character.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
                    model: Movie,
                    as: 'movies',
                    through: {
                        attributes: []
                    },
                    attributes: ['image', 'title' ]
                }
        });

        characterFound ? res.status(200).send(characterFound) : res.status(404).send({ error: 'Character not found' });
        
    } catch (error) {
        res.status(500).send({ error: 'Could not find character' });
    }
 

}

exports.update = async (req, res) => {

    let id = req.params.id;

    try {
        const characterFound = await Character.findByPk(id);

        if (!characterFound) {
           return res.status(404).send({ error: `Character with id ${id} not found` });
        }
        
        characterFound.update(req.body);

        res.status(200).send({ message: `Character with id ${id} updated successfully` });

    } catch (error) {
            res.status(500).send({ error: 'Something went wrong when trying to update character' });
    }

}

exports.delete = async (req, res) => {

    let id = req.params.id;

      try {
        const characterFound = await Character.findByPk(id);

        if (!characterFound) {
           return res.status(404).send({ error: `Character with id ${id} not found` });
        }
        
        characterFound.destroy(req.body);

        res.status(200).send({ message: `Character with id ${id} deleted successfully` });

    } catch (error) {
            res.status(500).send({ error: 'Something went wrong when trying to delete the character' });
    }
}