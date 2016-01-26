var express = require('express');
var router = express.Router();


router.get('/ator/cadastrar', function(req, res) {
  res.render('cadastrar-ator', { pageTitle: "Cadastrar Ator"});
});

router.get('/ator/listar', function(req, res) {
  	res.render('listar-atores', { pageTitle: "Listar Atores"});
});

router.get('/ator/:id', function(req, res) {
  	res.render('detalhe-ator', { pageTitle: "Ver Ator"});
});


module.exports = router;
