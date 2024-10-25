var express = require('express');
const authenticateToken = require('../middleware');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});


module.exports = router;
