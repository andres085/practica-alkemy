const router = require('express').Router();

const charactersRouter = require('./api/characters');
const moviesRouter = require('./api/movies');
const genresRouter = require('./api/genres');

router.use('/characters', charactersRouter);
router.use('/movies', moviesRouter);
router.use('/genres', genresRouter);

module.exports = router;