const router = require('express').Router();

const charactersRouter = require('./api/characters');
const moviesRouter = require('./api/movies');
const genresRouter = require('./api/genres');
const characterMovieRouter = require('./api/charactermovies');

router.use('/characters', charactersRouter);
router.use('/movies', moviesRouter);
router.use('/genres', genresRouter);
router.use('/character-movie', characterMovieRouter);

module.exports = router;