var express = require('express')
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

app.get('/', function(req, res){
   res.send("Webservice");
});

app.post('/', function(req, res) {
    console.log(req.body)
    res.send(req.body)
})

app.get('*', function(req, res){
   res.send('Desculpa, essa não é uma URL válida.');
});

app.listen(PORT, () => console.log(`Servidor ouvindo na porta ${ PORT }!`))