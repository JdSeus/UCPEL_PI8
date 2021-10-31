const Client = require("../models/Client");

exports.getClients = (req, res, next) => {

    var result = Client.getClients();

    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de clientes',
        result: result,
    });
};

