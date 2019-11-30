var express = require('express');
var router = express.Router();

var user = require('../controllers/UserController.js');
var character = require('../controllers/CharacterController.js');

router.get('/', user.main);

router.get('/list', user.list);

router.get('/create', user.create);

router.post('/save', user.save);

router.post('/check', user.check);

router.get('/match/:id', character.match);

router.get('/attack/:id/:enemyId', character.attack);


module.exports = router;
