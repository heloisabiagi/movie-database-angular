var express = require('express');
var router = express.Router();

router.get('/film/add', function(req, res) {
  res.render('add-film', { pageTitle: "Movie Database - Add Film"});
});

router.get('/film/list', function(req, res) {
  	res.render('list-films', { pageTitle: "Movie Database - Show Films"});
});

router.get('/film/:id', function(req, res) {
  	res.render('show-film', { pageTitle: "Movie Database - Film Info"});
});


module.exports = router;
