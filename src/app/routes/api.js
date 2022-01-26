const router = require('express').Router();

const middleware = require('./middleware');

const charactersRouter = require('./api/characters');
const moviesRouter = require('./api/movies');
const genresRouter = require('./api/genres');
const characterMovieRouter = require('./api/charactermovies');
const usersRouter = require('./api/users');

router.use('/characters', middleware.checkToken, charactersRouter);
router.use('/movies', middleware.checkToken, moviesRouter);
router.use('/genres', middleware.checkToken, genresRouter);
router.use('/character-movie', middleware.checkToken, characterMovieRouter);
router.use('/auth', usersRouter);

module.exports = router;