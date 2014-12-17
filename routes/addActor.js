var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res) {
  res.render('cadastrar-ator', { pageTitle: "Cadastrar Ator"});
});


module.exports = router;
