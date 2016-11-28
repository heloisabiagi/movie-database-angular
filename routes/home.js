var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { pageTitle: "Movie Database"});
});


module.exports = router;
