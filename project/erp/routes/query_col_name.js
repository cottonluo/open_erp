var express = require('express');
var userDao = require('../dao/userDao');
var router = express.Router();


router.get('/', function(req, res, next) {
	userDao.query_col_name(req, res, next);
});

module.exports = router;