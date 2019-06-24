var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const oportunidadeRef = database.ref('/oportunidade')

//Retorna todas as oportunidades
router.get('/', function(req, res){
    oportunidadeRef.once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var oportunidade = resultados[key];
                oportunidade.id = key;
                valores.push(oportunidade);
            })
        }
        res.send(JSON.stringify(valores))  
    })
})

//Retorna oportunidades específicas
router.get('/busca/:busca', function(req, res){
    var busca = req.params.busca.toUpperCase();
    oportunidadeRef.once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        var filtrado = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var oportunidade = resultados[key];
                oportunidade.id = key;
                valores.push(oportunidade);
            })
            filtrado = valores.filter((oportunidade) => {
                return oportunidade.cidade.toUpperCase().includes(busca) 
                        || oportunidade.titulo.toUpperCase().includes(busca)
                        || oportunidade.estado.toUpperCase().includes(busca) 
                        || oportunidade.unidade.toUpperCase().includes(busca)
                        || oportunidade.descricao.toUpperCase().includes(busca);
            })
        }
        res.send(JSON.stringify(filtrado))  
    })
})

//Retorna uma oportunidade
router.get('/:id', function(req, res){
    var id = req.params.id;
    oportunidadeRef.orderByKey().equalTo(id).once('value', function(snapshot){
        var resultados = snapshot.val()
        var oportunidade = null
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                oportunidade = resultados[key]
                oportunidade.id = key
            })
        }
        res.send(JSON.stringify(oportunidade))  
    })
})

//Retorna oportunidades de um contratante
router.get('/contratante/:contratante', function(req, res){
    var contratante = req.params.contratante;
    oportunidadeRef.orderByChild('contratante').equalTo(contratante).once('value', function(snapshot){
        var resultados = snapshot.val();
        var valores = [];
        if(resultados){
            var keys = Object.keys(resultados)
            keys.forEach((key) => {
                var oportunidade = resultados[key]
                oportunidade.id = key
                valores.push(oportunidade)
            })
        }
        res.send(JSON.stringify(valores))  
    })
})

//Salva oportunidade
router.post('/', function(req, res){
    oportunidadeRef.push(req.body, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao salvar oportunidade'))
        }else{
            res.send(200, JSON.stringify('Oportunidada salva com sucesso'))
        }
    })
})

//Remove oportunidade
router.delete('/:id', function(req, res){
    var oportunidade = req.params.id
    var deletarOportunidadeRef = database.ref('/oportunidade/' + oportunidade)
    deletarOportunidadeRef.remove(function(error){
        if(error){
            res.send(500, JSON.stringify('Erro na remoção da oportunidade'))
        }else {
            res.send(200, JSON.stringify('Oportunidade removida com sucesso'))
        }
    })
})

//Edita oportunidade
router.put('/', function(req, res){
    var oportunidade = req.body
    var dadosOportunidade = {
        titulo: oportunidade.titulo,
        descricao: oportunidade.descricao,
        unidade: oportunidade.unidade,
        cidade: oportunidade.cidade,
        estado: oportunidade.estado,
        contratante: oportunidade.contratante
    }
    oportunidadeRef.child(oportunidade.id).set(dadosOportunidade, function(error){
        if(error){
            res.send(500, JSON.stringify('Erro ao editar oportunidade'))
        }else {
            res.send(200, JSON.stringify('Oportunidade editada com sucesso'))
        }
    })
})

//Exporta o router para uso em index.js
module.exports = router