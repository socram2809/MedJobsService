var express = require('express')
var bodyParser = require('body-parser');
var app = express();

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

app.listen(8080, () => console.log("Servidor ouvindo na porta 8080!"))