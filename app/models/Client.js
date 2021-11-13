const fs = require('fs');

class Client {

  static readDocument() {
    return new Promise((resolve, reject) => {
      try {
        var content = fs.readFileSync("./app/models/clientes.json", 'utf8');
        try {
          var result = JSON.parse(content);
          return resolve(result);
        } catch (err) {
          var error = new Error('Erro ao converter texto para JSON.')
          error.status = 500;
          return reject(error)
        }
      } catch(err) {
        var error = new Error('Erro ao ler o arquivo.')
        error.status = 500;
        return reject(error)
      }
    });
  }

  static getClients() {
    return new Promise((resolve, reject) => {
      Client.readDocument().then((clients) => {
        resolve(clients);
      }).catch((error) => {
        reject(error);
      }); 
    }); 
  }

  static getClient(id) {
    return new Promise((resolve, reject) => {
      Client.readDocument().then((clientes) => {
        clientes.forEach(client => {
          if (client.id == id) {
            resolve(client);
          }
        });
        var error = new Error('Cliente não encontrado.')
        error.status = 404;
        return reject(error)
      }).catch((error) => {
        reject(error);
      }); 
    }); 
  }

}
module.exports = Client; 