var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const experienciaRef = database.ref('/experiencia')

//Retorna todas as experiências
router.get('/', function(req, res){
    experienciaRef.once('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna experiências de um médico
router.get('/medico/:medico', function(req, res){
    var medico = req.params.medico;
    experienciaRef.orderByChild('medico').equalTo(medico).once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var experiencia = resultados[key]
                experiencia.id = key
                valores.push(experiencia)
            })
        }
        res.send(JSON.stringify(valores))  
    })
})

//Salva experiência
router.post('/', function(req, res){
    experienciaRef.push(req.body, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao salvar experiência'))
        }else {
            res.send(200, JSON.stringify('Experiência cadastrada com sucesso'))
        }
    })
})

//Remove experiência
router.delete('/:id', function(req, res){
    var experiencia = req.params.id
    var deletarExperienciaRef = database.ref('/experiencia/' + experiencia)
    deletarExperienciaRef.remove(function(error){
        if(error){
            res.send(500, JSON.stringify('Erro na remoção da experiência'))
        }else {
            res.send(200, JSON.stringify('Experiência removida com sucesso'))
        }
    })
})

//Edita experiência
router.put('/', function(req, res){
    var experiencia = req.body
    var dadosExperiencia = {
        empresa: experiencia.empresa,
        inicio: experiencia.inicio,
        fim: experiencia.fim,
        medico: experiencia.medico
    }
    experienciaRef.child(experiencia.id).set(dadosExperiencia, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao editar experiência'))
        }else {
            res.send(200, JSON.stringify('Experiência editada com sucesso'))
        }
    })
})

//Exporta o router para uso em index.js
module.exports = router