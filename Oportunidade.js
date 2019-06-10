var express = require('express')
var router = express.Router()
var firebase = require('./Firebase.js')
const database = firebase.database()
const oportunidadeRef = database.ref('/oportunidade')

//Retorna todas as oportunidades
router.get('/', function(req, res){
    oportunidadeRef.on('value', function(snapshot){
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
    oportunidadeRef.on('value', function(snapshot){
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
    oportunidadeRef.orderByKey().equalTo(id).on('value', function(snapshot){
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

//Salva/Edita oportunidade
router.post('/', function(req, res){
    oportunidadeRef.push(req.body, function(error) {
        if(error) {
            res.send(500, 'Erro ao salvar oportunidade')
        }else {
            res.send(200, 'Oportunidada salva com sucesso')
        }
    })
})

//Exporta o router para uso em index.js
module.exports = router