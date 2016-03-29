var express = require('express');
var router = express.Router();

router.get('/film/add', function(req, res) {
  res.render('add-film', { pageTitle: "Movie Database - Add Movie"});
});

router.get('/film/list', function(req, res) {
  	res.render('list-films', { pageTitle: "Movie Database - Show Movies"});
});

router.get('/film/:id', function(req, res) {
  	res.render('show-film', { pageTitle: "Movie Database - Movie Info"});
});


module.exports = router;
