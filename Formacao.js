var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const formacaoRef = database.ref('/formacao')

//Retorna todas as formações
router.get('/', function(req, res){
    formacaoRef.once('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna formações de um médico
router.get('/medico/:medico', function(req, res){
    var medico = req.params.medico;
    formacaoRef.orderByChild('medico').equalTo(medico).once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var formacao = resultados[key]
                formacao.id = key
                valores.push(formacao)
            })
        }
        res.send(JSON.stringify(valores))  
    })
})

//Salva formacao
router.post('/', function(req, res){
    formacaoRef.push(req.body, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao salvar formação'))
        }else {
            res.send(200, JSON.stringify('Formação cadastrada com sucesso'))
        }
    })
})

//Remove formação
router.delete('/:id', function(req, res){
    var formacao = req.params.id
    var deletarFormacaoRef = database.ref('/formacao/' + formacao)
    deletarFormacaoRef.remove(function(error){
        if(error){
            res.send(500, JSON.stringify('Erro na remoção da formação'))
        }else {
            res.send(200, JSON.stringify('Formação removida com sucesso'))
        }
    })
})

//Edita formação
router.put('/', function(req, res){
    var formacao = req.body
    var dadosFormacao = {
        curso: formacao.curso,
        escolaridade: formacao.escolaridade,
        fim: formacao.fim,
        inicio: formacao.inicio,
        instituicao: formacao.instituicao,
        medico: formacao.medico
    }
    formacaoRef.child(formacao.id).set(dadosFormacao, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao editar formação'))
        }else {
            res.send(200, JSON.stringify('Formação editada com sucesso'))
        }
    })
})

//Exporta o router para uso em index.js
module.exports = router