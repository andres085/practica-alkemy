const router = require('express').Router();

const genres  = require('../../controllers/genre.controller');

router.post('/', genres.create);

router.get('/', genres.get);

router.get('/:id', genres.getOne);
   
router.put('/:id', genres.update);
 
router.delete('/:id',genres.delete)
  
module.exports = router;