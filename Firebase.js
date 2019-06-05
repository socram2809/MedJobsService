/**
 * Inicializa o serviço de banco de dados do Firebase
 */
var admin = require('firebase-admin')
var contaDoServico = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(contaDoServico),
    databaseURL: "https://medjobs-9f531.firebaseio.com"
  });
admin.initializeApp(config);

module.exports = admin;