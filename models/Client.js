const fs = require('fs');

class Client {


  constructor() {

  }

  static readFile() {
    var result;
    var error;
    fs.readFile("./models/clientes.json", "utf8", (err, jsonString) => {
      if (err) {
        error = 'Error Reading the File.';
      } else {
        try {
          result = JSON.parse(jsonString);
          console.log(clients);
        } catch (err) {
          error = 'Error parsing JSON string.';
        }
      }
    });
    if (error != undefined) {
      return error;
    } else {
      return result;
    }
  }

  Error(message) {
    const error = {
      message: message,
    }
    return error;
  }

  static getClients() {
    var result = self.readFile();
    return result;
  }

}
module.exports = Client; 