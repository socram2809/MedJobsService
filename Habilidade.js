var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const habilidadeRef = database.ref('/habilidade')

//Retorna todas as habilidades
router.get('/', function(req, res){
    habilidadeRef.once('value', function(snapshot){
        res.send(JSON.stringify(snapshot.val()))  
    })
})

//Retorna habilidades de um médico
router.get('/medico/:medico', function(req, res){
    var medico = req.params.medico;
    habilidadeRef.orderByChild('medico').equalTo(medico).once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var habilidade = resultados[key]
                habilidade.id = key
                valores.push(habilidade)
            })
        }
        res.send(JSON.stringify(valores))  
    })
})

//Salva habilidade
router.post('/', function(req, res){
    habilidadeRef.push(req.body, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao salvar habilidade'))
        }else {
            res.send(200, JSON.stringify('Habilidade cadastrada com sucesso'))
        }
    })
})

//Remove habilidade
router.delete('/:id', function(req, res){
    var habilidade = req.params.id
    var deletarHabilidadeRef = database.ref('/habilidade/' + habilidade)
    deletarHabilidadeRef.remove(function(error){
        if(error){
            res.send(500, JSON.stringify('Erro na remoção da habilidade'))
        }else {
            res.send(200, JSON.stringify('Habilidade removida com sucesso'))
        }
    })
})

//Edita habilidade
router.put('/', function(req, res){
    var habilidade = req.body
    var dadosHabilidade = {
        descricao: habilidade.descricao,
        medico: habilidade.medico
    }
    habilidadeRef.child(habilidade.id).set(dadosHabilidade, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao editar experiência'))
        }else {
            res.send(200, JSON.stringify('Experiência editada com sucesso'))
        }
    })
})

//Exporta o router para uso em index.js
module.exports = router