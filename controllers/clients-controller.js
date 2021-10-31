const Client = require("../models/Client");

exports.getClients = (req, res, next) => {
    const client = new Client();
    client.getClients();
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de clientes'
    });
};

