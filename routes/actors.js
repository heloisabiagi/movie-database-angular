var express = require('express');
var router = express.Router();


router.get('/actor/add', function(req, res) {
  res.render('add-actor', { pageTitle: "Movie Database - Add Actor"});
});

router.get('/actor/list', function(req, res) {
  	res.render('list-actors', { pageTitle: "Movie Database - List Actors"});
});

router.get('/actor/:id', function(req, res) {
  	res.render('show-actor', { pageTitle: "Movie Database - Actor Info"});
});


module.exports = router;
