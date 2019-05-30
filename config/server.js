/* importar módulo do express */
var express = require('express');

/* importar módulo do consign */
var consign = require('consign');

/* importar módulo do express-validator */
var expressValidator = require('express-validator');

/* importar módulo do body-parser */
var bodyParser = require('body-parser');

/* iniciar mo objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* Configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* Efetua o auto-load das rotas, módulos, models e controllers pra um objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;