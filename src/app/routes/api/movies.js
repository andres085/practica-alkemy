const router = require('express').Router();

const movies  = require('../../controllers/movie.controller');

router.post('/', movies.create);

router.get('/', movies.get);

router.get('/:id', movies.getOne);
   
router.put('/:id', movies.update);
 
router.delete('/:id',movies.delete)
  
module.exports = router;