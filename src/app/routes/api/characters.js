const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Character } = require('../../config/db.config');

router.get('/', async (req, res) => {

    const name = req.query.name;
    const age = req.query.age;

    let condition = name ? { name: { [Op.like]: `%${name}%` } } : age ? { age: { [Op.like]: `%${age}%` } } : null;

    const characters = await Character.findAll({
        where: condition,
        attributes: {exclude: ['id', 'age', 'weight', 'story', 'createdAt', 'updatedAt']},
    });

    res.json(characters);

});

router.get('/:characterId', async (req, res) => {
    const character = await Character.findOne({
        where: { id: req.params.characterId }
    });

    if (character) {
        res.status(200).json({
            data: character,
            message: 'Character found successfully'
        });
    } else {
        res.status(404).json({
            message: 'Character not found'
        });
    }
});

router.post('/', async (req, res) => {
    const character = await Character.create(req.body);

    res.json(character);
});

router.put('/:characterId', async (req, res) => {
    await Character.update(req.body, {
        where: {
            id: req.params.characterId
        }
    });
    res.json({success: 'Character modified successfully'})
});

router.delete('/:characterId', async (req, res) => {
    await Character.destroy({
        where: {id: req.params.characterId}
    });
    res.json({ success: 'Character deleted successfully' });
});

module.exports = router;