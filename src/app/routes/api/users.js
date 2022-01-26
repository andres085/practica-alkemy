const router = require('express').Router();

const users  = require('../../controllers/user.controller');

router.post('/register', users.create);

router.post('/login', users.login);
  
module.exports = router;