const router = require('express').Router();

const { Character } = require('../../config/db.config');

router.get('/', async (req, res) => {
    const characters = await Character.findAll();

    res.json(characters);

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