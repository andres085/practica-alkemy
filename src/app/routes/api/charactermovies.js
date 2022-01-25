const router = require('express').Router();

const characterMovie  = require('../../controllers/charactermovie.controller');

router.post('/', characterMovie.create);

module.exports = router;
