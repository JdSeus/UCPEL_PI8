const Client = require("../models/Client");

exports.getClients = (req, res, next) => {
    Client.getClients().then((clients) => {
        res.status(200).send(clients);
    }).catch((error) => {
        res.status(error.status).send({
            erro: {
                status: error.status,
                mensagem: error.message
            }
        });
    });    
};

exports.getClient = (req, res, next) => {
    const id = req.params.id;
    Client.getClient(id).then((clients) => {
        res.status(200).send(clients);
    }).catch((error) => {
        res.status(error.status).send({
            erro: {
                status: error.status,
                mensagem: error.message
            }
        });
    });   
};
