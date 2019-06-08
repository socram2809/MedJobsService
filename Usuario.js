var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const usuariosRef = database.ref('/usuario')

//Retorna os usuários
router.get('/', function(req, res){
    usuariosRef.on('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Salva/Edita usuário
router.post('/', function(req, res){
    let usuario = {
        nome: req.body.nome,
        tipo: req.body.tipo
    }
    usuariosRef.child(req.body.uid).set(usuario)
    res.send('Usuario cadastrado')
})

//Exporta o router para uso em index.js
module.exports = router