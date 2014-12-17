var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res) {
  res.render('cadastrar-filme', { pageTitle: "Cadastrar Filme"});
});


module.exports = router;
