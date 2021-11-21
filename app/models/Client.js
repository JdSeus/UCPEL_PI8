const fs = require('fs');

class Client {

  static readDocument() {
    return new Promise((resolve, reject) => {

      try {
        var content = fs.readFileSync("./app/models/clientes.json", 'utf8');
        try {
          if (content.length == 0) {
            Client.writeDocument('[]').then(() => {
              var result = JSON.parse('[]');
              return resolve(result);
            })
          } else {
            var result = JSON.parse(content);
            return resolve(result);
          } 
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

      Client.readDocument().then((clientsRaw) => {
        var clients = []
        if (clientsRaw.length > 0) {
          clientsRaw.forEach(client => {
            if (Object.keys(client).length > 1) {
              clients.push(client);
            }
          });
        } else {
          clients = clientsRaw;
        }
        return resolve(clients);
      }).catch((error) => {
        return reject(error);
      }); 

    }); 
  }

  static getClientsRaw() {
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

      Client.getClientsRaw().then((clients) => {
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

      Client.getClientsRaw().then((clients) => {
        var clientExists = false;
        clients.forEach((client) => {
          if (Object.keys(client).length > 1) {
            if (client.id == clientObject.id) {
              clientExists = true;
              client.id = clientObject.id;
              client.nome = clientObject.nome;
              client.endereco = clientObject.endereco;
              client.cep = clientObject.cep;
              client.data_de_nascimento = clientObject.data_de_nascimento;
              client.telefone = clientObject.telefone;
            }
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
        return reject(error)
      });    

    }); 
  }
  

  static patchClient(clientObject) {
    return new Promise((resolve, reject) => {

      Client.getClientsRaw().then((clients) => {
        var clientExists = false;
        clients.forEach((client) => {
          if (Object.keys(client).length > 1) {
            if (client.id == clientObject.id) {
              clientExists = true;
              if (typeof clientObject.id != 'undefined') {
                client.id = clientObject.id;
              }
              if (typeof clientObject.nome != 'undefined') {
                client.nome = clientObject.nome;
              }
              if (typeof clientObject.endereco != 'undefined') {
                client.endereco = clientObject.endereco;
              }
              if (typeof clientObject.cep != 'undefined') {
                client.cep = clientObject.cep;
              }
              if (typeof clientObject.data_de_nascimento != 'undefined') {
                client.data_de_nascimento = clientObject.data_de_nascimento;
              }
              if (typeof clientObject.telefone != 'undefined') {
                client.telefone = clientObject.telefone;
              }
            }
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
        return reject(error)
      });  

    }); 
  }

  static deleteClient(id) {
    return new Promise((resolve, reject) => {

      Client.getClientsRaw().then((clients) => {
        var clientExists = false;
        clients.forEach(client => {
          if (Object.keys(client).length > 1) {
            if (client.id == id) {
              clientExists = true;
              client.nome = undefined;
              client.endereco = undefined;
              client.cep = undefined;
              client.data_de_nascimento = undefined;
              client.telefone = undefined;
            }
          }
        });
        if (clientExists == true) {
          var clientsJSON = JSON.stringify(clients);
          Client.writeDocument(clientsJSON).then(() => {
            resolve({
              sucesso: {
                status: 200,
                mensagem: "Cliente removido com sucesso!"
              }
            }) 
          }).catch((error) => {
            return reject(error);
          });
        } else {
          var error = new Error('Cliente não encontrado.')
          error.status = 404;
          return reject(error)
        }
      }).catch((error) => {
        return reject(error)
      }); 

    }); 
  }

}
module.exports = Client; 

