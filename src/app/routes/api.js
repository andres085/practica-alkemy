const router = require('express').Router();

const charactersRouter = require('./api/characters');

router.use('/characters', charactersRouter);

module.exports = router;