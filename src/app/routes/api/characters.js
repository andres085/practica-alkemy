const router = require('express').Router();

const characters  = require('../../controllers/character.controller');

router.post('/', characters.create);

router.get('/', characters.get);

router.get('/:id', characters.getOne);
   
router.put('/:id', characters.update);
 
router.delete('/:id',characters.delete)
  
module.exports = router;