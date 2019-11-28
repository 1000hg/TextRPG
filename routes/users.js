var express = require('express');
var router = express.Router();

var user = require('../controllers/UserController.js');

router.get('/', user.main);

router.get('/list', user.list);

router.get('/create', user.create);

router.post('/save', user.save);

router.post('/check', user.check);


module.exports = router;
