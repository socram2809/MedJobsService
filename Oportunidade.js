var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const usuariosRef = database.ref('/oportunidade')

//Retorna todas as oportunidades
router.get('/', function(req, res){
    usuariosRef.on('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna oportunidades específicas
router.get('/busca/:busca', function(req, res){
    var busca = req.params.busca.toUpperCase();
    usuariosRef.on('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        var filtrado = [];
        var keys = Object.keys(resultados)
        keys.forEach((key) => {
            valores.push(resultados[key]);
        })
        filtrado = valores.filter((oportunidade) => {
            return oportunidade.cidade.toUpperCase().includes(busca) 
                    || oportunidade.titulo.toUpperCase().includes(busca)
                    || oportunidade.estado.toUpperCase().includes(busca) 
                    || oportunidade.unidade.toUpperCase().includes(busca)
                    || oportunidade.descricao.toUpperCase().includes(busca);
        })
        res.send(JSON.stringify(filtrado))  
    })
})

//Salva/Edita oportunidade
router.post('/', function(req, res){
    res.send(usuariosRef.push(req.body))
})

//Exporta o router para uso em index.js
module.exports = router