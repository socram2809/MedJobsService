const https = require('https');

module.exports = app => {

    const ip = app.get('ip');

    const pessoas = [

    {"nome": "José da Silva", "email":"jose@email.com", "fotos": [`http://${ip}:8080/images/jose1.jpg`, `http://${ip}:8080/images/jose2.jpg`, `http://${ip}:8080/images/jose3.jpg`]},
    {"nome":"Maria Costa", "email":"maria@email.com", "fotos": [`http://${ip}:8080/images/maria1.jpg`, `http://${ip}:8080/images/maria2.jpg`, `http://${ip}:8080/images/maria3.jpg`] },
    {"nome": "Bolinha Rocha", "email":"bolinha@email.com", "fotos": [`http://${ip}:8080/images/bolinha1.jpg`, `http://${ip}:8080/images/bolinha2.jpg`, `http://${ip}:8080/images/bolinha3.jpg`] },
    {"nome":"Luluzinha Ribeiro", "email":"luluzinha@email.com", "fotos": [`http://${ip}:8080/images/luluzinha1.jpg`, `http://${ip}:8080/images/luluzinha2.jpg`, `http://${ip}:8080/images/luluzinha3.jpg`] },
    {"nome":"Carlos Eduardo", "email":"carlos@email.com", "fotos": [`http://${ip}:8080/images/carlos1.jpg`, `http://${ip}:8080/images/carlos2.jpg`, `http://${ip}:8080/images/carlos3.jpg`] },
    {"nome":"Patrícia Sousa", "email":"patricia@email.com", "fotos": [`http://${ip}:8080/images/patricia1.jpg`, `http://${ip}:8080/images/patricia2.jpg`, `http://${ip}:8080/images/patricia3.jpg`] },
    {"nome":"Gustavo Nunes", "email":"gustavo@email.com", "fotos": [`http://${ip}:8080/images/gustavo1.jpg`, `http://${ip}:8080/images/gustavo2.jpg`, `http://${ip}:8080/images/gustavo3.jpg`] },
    {"nome":"Felipe Abreu", "email":"felipe@email.com" , "fotos": [`http://${ip}:8080/images/felipe1.jpg`, `http://${ip}:8080/images/felipe2.jpg`, `http://${ip}:8080/images/felipe3.jpg`]},
    {"nome":"Carla Texeira", "email":"carla@email.com", "fotos": [`http://${ip}:8080/images/carla1.jpg`, `http://${ip}:8080/images/carla2.jpg`, `http://${ip}:8080/images/carla3.jpg`] }
    // {"nome":"Maurício Dantas", "email":"mauricio@email.com", "fotos": [`http://${ip}:8080/images/mauricio1.jpg`, `http://${ip}:8080/images/mauricio2.jpg`, `http://${ip}:8080/images/mauricio3.jpg`] },
    // {"nome":"Natália Ferreira", "email":"natalia@email.com" , "fotos": [`http://${ip}:8080/images/natalia1.jpg`, `http://${ip}:8080/images/natalia2.jpg`, `http://${ip}:8080/images/natalia3.jpg`]},
    // {"nome":"Gisele Torres", "email":"gisele@email.com" , "fotos": [`http://${ip}:8080/images/gisele1.jpg`, `http://${ip}:8080/images/gisele2.jpg`, `http://${ip}:8080/images/gisele3.jpg`]},
    // {"nome":"Luiz Felipe", "email":"luiz@email.com" , "fotos": [`http://${ip}:8080/images/luiz1.jpg`, `http://${ip}:8080/images/luiz2.jpg`, `http://${ip}:8080/images/luiz3.jpg`]},
    // {"nome":"Vinícius Souza", "email":"vinicius@email.com", "fotos": [`http://${ip}:8080/images/vinicius1.jpg`, `http://${ip}:8080/images/vinicius2.jpg`, `http://${ip}:8080/images/vinicius3.jpg`] }   
    ];

    app.get('/api/pessoa/listar', (req, res) =>
        res.json(pessoas));

    
};
