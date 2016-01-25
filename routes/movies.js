var express = require('express');
var router = express.Router();

router.get('/filme/cadastrar', function(req, res) {
  res.render('cadastrar-filme', { pageTitle: "Cadastrar Filme"});
});

router.get('/filme/listar', function(req, res) {
  	res.render('listar-filme', { pageTitle: "Listar Filmes"});
});

router.get('/filme/:id', function(req, res) {
  	res.render('detalhe-filme', { pageTitle: "Ver Filme"});
});


module.exports = router;
