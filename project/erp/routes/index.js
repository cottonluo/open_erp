var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index.ejs', { title: 'I will fucking screwing ya all!!' });
});
router.get('/recording', function(req, res, next) {
  res.render('../views/employees.html');
});
router.get('/login', function(req, res, next) {
  res.render('../views/login.html');
});

module.exports = router;
