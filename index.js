/**
 * Configuração de dependências
 */
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
const path = require('path')
const PORT = process.env.PORT || 8080
app.use(bodyParser.json())

/**
 * Define a pasta pública do Webservice
 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Importa os routers
 */
var usuarios = require('./Usuarios.js');

/**
 * Definição dos routers
 */
app.use('/usuario', usuarios);

app.get('*', function(req, res){
   res.send('Desculpa, essa não é uma URL válida.');
})

app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${ PORT }!`))