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
            if (Object.keys(client).length > 1) {
              resolve(client);
            } else {
              var error = new Error('Cliente não encontrado.')
              error.status = 404;
              return reject(error)
            }
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

  static postClient(clientObject) {
    return new Promise((resolve, reject) => {
      Client.readDocument().then((clients) => {
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
            resolve(client);
          }).catch((error) => {
            reject(error);
          });   
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      }); 
    }); 
  }

}
module.exports = Client; 

/*
[{"id":1,"nome":"Altrano","endereco":"Rua do Altrano","cep":12345678,"data_de_nascimento":"1995-12-17T03:24:00","telefone":53111122222},{"id":2,"nome":"Beltrano","endereco":"Rua do Beltrano","cep":12345678,"data_de_nascimento":"1995-12-17T03:24:00","telefone":53111122222},{"id":3,"nome":"Ciclano","endereco":"Rua do Ciclano","cep":12345678,"data_de_nascimento":"1995-12-17T03:24:00","telefone":53111122222},{"id":4,"nome":"Deltrano","endereco":"Rua do Deltrano","cep":12345678,"data_de_nascimento":"1995-12-17T03:24:00","telefone":53111122222},{"id":5,"nome":"Feltrano","endereco":"Rua do Feltrano","cep":12345678,"data_de_nascimento":"1995-12-17T03:24:00","telefone":53111122222},{"id":7,"data_de_nascimento":"1995-12-17T03:24:00","telefone":"53111122222"},{"id":9,"endereco":"Rua do Altrano","cep":"12345678","data_de_nascimento":"1995-12-17T03:24:00","telefone":"53111122222"},{"id":10,"nome":"Altrano","endereco":"Rua do Altrano","cep":"12345678","data_de_nascimento":"1995-12-17T03:24:00","telefone":"53111122222"},{"id":11,"nome":"Altrano","endereco":"Rua do Altrano","cep":"12345678","data_de_nascimento":"1995-12-17T03:24:00","telefone":"53111122222"}]
*/