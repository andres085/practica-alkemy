const router = require('express').Router();

const charactersRouter = require('./api/characters');
const moviesRouter = require('./api/movies');

router.use('/characters', charactersRouter);
router.use('/movies', moviesRouter);

module.exports = router;