var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const usuariosRef = database.ref('/usuario')

//Retorna os usuários
router.get('/', function(req, res){
    usuariosRef.once('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna um usuário
router.get('/:id', function(req, res){
    var id = req.params.id;
    usuariosRef.orderByKey().equalTo(id).once('value', function(snapshot){
        var resultados = snapshot.val()
        var usuario = null
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                usuario = resultados[key]
                usuario.uid = key
            })
        }
        res.send(JSON.stringify(usuario))  
    })
})

//Salva/Edita usuário
router.post('/', function(req, res){
    let usuario = {
        nome: req.body.nome,
        tipo: req.body.tipo
    }
    usuariosRef.child(req.body.uid).set(usuario, function(error) {
        if(error) {
            res.send(500, JSON.stringify('Erro ao cadastrar usuario'))
        }else {
            res.send(200, JSON.stringify('Usuário cadastrado'))
        }
    })
})

//Exporta o router para uso em index.js
module.exports = router