const fs = require('fs');

class Client {

  constructor() {
    this.error = {
      error: false,
      message: undefined,
    };
  }

  setError(message) {
    this.error = {
      error: true,
      message: message,
    }
  }

  getClients() {
    fs.readFile("./models/clients.json", "utf8", (err, jsonString) => {
      if (err) {
        this.setError('Error Reading the File.')
        console.log(this.error);
        return;
      }
      try {
        const clients = JSON.parse(jsonString);
        console.log(clients.clients)
      } catch (err) {
        this.setError('Error parsing JSON string.')
        console.log(this.error);
        return
      }
    });
  }
}
module.exports = Client; 