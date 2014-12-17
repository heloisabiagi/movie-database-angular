var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  	res.render('listar-filme', { pageTitle: "Listar Filmes"});
});

module.exports = router;