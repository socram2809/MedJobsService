var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const usuariosRef = database.ref('/candidatura')

//Retorna todas as candidaturas
router.get('/', function(req, res){
    usuariosRef.on('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna candidaturas de um médico
router.get('/medico/:medico', function(req, res){
    var medico = req.params.medico;
    usuariosRef.orderByChild('medico').equalTo(medico).on('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        var keys = Object.keys(resultados)
        keys.forEach((key) => {
            var candidatura = resultados[key]
            candidatura.id = key
            valores.push(candidatura)
        })
        res.send(JSON.stringify(valores))  
    })
})

//Salva/Edita candidatura
router.post('/', function(req, res){
    res.send(usuariosRef.push(req.body))
})

//Exporta o router para uso em index.js
module.exports = router