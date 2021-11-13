const Client = require("../models/Client");

exports.getClients = (req, res, next) => {
    Client.readDocument().then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send({
            error: error,
        });
    });    
};

