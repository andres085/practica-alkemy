const router = require('express').Router();

const characterMovie  = require('../../controllers/charactermovie.controller');

router.post('/', characterMovie.create);
router.put('/:id', characterMovie.update);
router.delete('/:id', characterMovie.delete);

module.exports = router;
