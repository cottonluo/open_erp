var express = require('express');
var userDao = require('../dao/userDao');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

router.get('/queryById', function(req, res, next) {
	userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
	userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
	userDao.update(req, res, next);
});
router.get('/leave', function(req, res, next) {
	userDao.leave(req, res, next);
});
router.get('/department_groupby', function(req, res, next) {
	userDao.department_groupby(req, res, next);
});
router.get('/get_similar_warehouse_record', function(req, res, next) {
	userDao.get_similar_warehouse_record(req, res, next);
});

module.exports = router;