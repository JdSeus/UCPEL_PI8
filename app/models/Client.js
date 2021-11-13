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

  static writeDocument(contentJson) {
    return new Promise((resolve, reject) => {
      
      try {
        fs.writeFileSync('./app/models/clientes.json', contentJson)
        return resolve();
      } catch(err) {
        var error = new Error('Erro ao escrever no arquivo.')
        error.status = 500;
        return reject(error)
      }

    });
  }

  static getClients() {
    return new Promise((resolve, reject) => {

      Client.readDocument().then((clients) => {
        return resolve(clients);
      }).catch((error) => {
        return reject(error);
      }); 

    }); 
  }

  static getClient(id) {
    return new Promise((resolve, reject) => {

      Client.getClients().then((clients) => {
        clients.forEach(client => {
          if (client.id == id) {
            if (Object.keys(client).length > 1) {
              return resolve(client);
            } else {
              var error = new Error('Cliente não encontrado.')
              error.status = 404;
              return reject(error);
            }
          }
        });
        var error = new Error('Cliente não encontrado.')
        error.status = 404;
        return reject(error)
      }).catch((error) => {
        return reject(error)
      }); 

    }); 
  }

  static postClient(clientObject) {
    return new Promise((resolve, reject) => {

      Client.getClients().then((clients) => {
        if (clients.length > 0) {
          var lastId = clients[clients.length-1].id;
        } else {
          var lastId = 0;
        }
        var newClient = {
          "id": (lastId + 1),
          "nome": clientObject.nome,
          "endereco": clientObject.endereco,
          "cep": clientObject.cep,
          "data_de_nascimento": clientObject.data_de_nascimento,
          "telefone": clientObject.telefone
        }
        clients.push(newClient);
        var clientsJSON = JSON.stringify(clients);
        Client.writeDocument(clientsJSON).then(() => {
          Client.getClient(lastId+1).then((client) => {
            return resolve(client);
          }).catch((error) => {
            return reject(error);
          });   
        }).catch((error) => {
          return reject(error);
        });
      }).catch((error) => {
        return reject(error)
      }); 

    }); 
  }

  static putClient(clientObject) {
    return new Promise((resolve, reject) => {

      /*
      Client.readDocument().then((clientes) => {
        var clientExists = false;
        clientes.forEach(client => {
          if (client.id == clientObject.id) {
            clientExists = true;
            client.id = clientObject.id;
            client.nome = clientObject.nome;
            client.endereco = clientObject.endereco;
            client.cep = clientObject.cep;
            client.data_de_nascimento = clientObject.data_de_nascimento;
            client.telefone = clientObject.telefone;
          }
        });
        if (clientExists == true) {
          var clientsJSON = JSON.stringify(clients);
          Client.writeDocument(clientsJSON).then(() => {
            Client.getClient(clientObject.id).then((client) => {
              return resolve(client);
            }).catch((error) => {
              return reject(error);
            });   
          }).catch((error) => {
            return reject(error);
          });
        } else {
          var error = new Error('Cliente não encontrado.')
          error.status = 404;
          return reject(error)
        } 
      }).catch((error) => {
        return reject(error);
      }); 
      */
    }); 
  }

}
module.exports = Client; 

