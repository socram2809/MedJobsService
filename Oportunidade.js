var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const usuariosRef = database.ref('/oportunidade')

//Retorna as oportunidades
router.get('/', function(req, res){
    usuariosRef.on('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Salva/Edita oportunidade
router.post('/', function(req, res){
    res.send(usuariosRef.push(req.body))
})

//Exporta o router para uso em index.js
module.exports = router