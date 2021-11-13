const fs = require('fs');

class Client {

  static readDocument() {
    return new Promise((resolve, reject) => {
      try {
        var content = fs.readFileSync("./models/clientes.json", 'utf8');
        try {
          var result = JSON.parse(content);
          return resolve(result);
        } catch (err) {
          var error = 'Error parsing JSON string.';
          return reject(error)
        }
      } catch(err) {
        var error = 'Error reading the file.';
        return reject(error)
      }
    });
  }

}
module.exports = Client; 