var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', myVar: 'Testeee' });
});

router.get('/ator/cadastrar', function(req, res) {
  res.render('cadastrar-ator', { pageTitle: "Cadastrar Ator"});
});

router.get('/ator/listar', function(req, res) {
  	res.render('listar-atores', { pageTitle: "Listar Atores"});
});

router.get('/ator/:id', function(req, res) {
  	res.render('detalhe-ator', { pageTitle: "Ator"});
});

router.get('/filme/cadastrar', function(req, res) {
  res.render('cadastrar-filme', { pageTitle: "Cadastrar Filme"});
});

router.get('/filme/listar', function(req, res) {
  	res.render('listar-filme', { pageTitle: "Listar Filmes"});
});


module.exports = router;
