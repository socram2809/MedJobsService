/**
 * Configuração de dependências
 */
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
const path = require('path')
const PORT = process.env.PORT || 8080

/**
 * Permissões de acesso ao servidor
 */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS, PUT');
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Define a pasta pública do Webservice
 */
app.use(express.static(path.join(__dirname, 'public')))

/**
 * Importa os routers
 */
var usuario = require('./Usuario.js');
var oportunidade = require('./Oportunidade.js');
var candidaduta = require('./Candidatura.js');
var formacao = require('./Formacao.js');
var experiencia = require('./Experiencia.js');
var habilidade = require('./Habilidade.js');

/**
 * Definição dos routers
 */
app.use('/usuario', usuario);
app.use('/oportunidade', oportunidade);
app.use('/candidatura',candidaduta);
app.use('/formacao', formacao);
app.use('/experiencia', experiencia);
app.use('/habilidade', habilidade);

/**
 * Caso seja uma URL inválida, mostra a mensagem definida abaixo
 */
app.get('*', function(req, res){
   res.send('Desculpa, essa não é uma URL válida.');
})

/**
 * Mostra a porta que o servidor está ouvindo
 */
app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${ PORT }!`));