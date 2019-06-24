var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const candidaturaRef = database.ref('/candidatura')

//Retorna todas as candidaturas
router.get('/', function(req, res){
    candidaturaRef.once('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna candidaturas de um médico
router.get('/medico/:medico', function(req, res){
    var medico = req.params.medico;
    candidaturaRef.orderByChild('medico').equalTo(medico).once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var candidatura = resultados[key]
                candidatura.id = key
                valores.push(candidatura)
            })
        }
        res.send(JSON.stringify(valores))  
    })
})

//Salva/Edita candidatura
router.post('/', function(req, res){
    candidaturaRef.push(req.body, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao salvar candidatura'))
        }else {
            res.send(200, JSON.stringify('Candidatura cadastrada com sucesso'))
        }
    })
})

//Remove candidatura
router.delete('/:id', function(req, res){
    var candidatura = req.params.id
    var deletarCandidaturaRef = database.ref('/candidatura/' + candidatura)
    deletarCandidaturaRef.remove(function(error){
        if(error){
            res.send(500, JSON.stringify('Erro na remoção da candidatura'))
        }else {
            res.send(200, JSON.stringify('Candidatura removida com sucesso'))
        }
    })
})

//Remove candidaturas de uma oportunidade
router.delete('/oportunidade/:oportunidade', function(req, res){
    var oportunidade = req.params.oportunidade
    candidaturaRef.orderByChild('oportunidade').equalTo(oportunidade).once('value', function(snapshot){
        snapshot.forEach(function(data) {
            var registro = data.val()
            if(registro.oportunidade == oportunidade){
                candidaturaRef.child(data.key).remove()
            } 
        })
    })
})

//Exporta o router para uso em index.js
module.exports = router