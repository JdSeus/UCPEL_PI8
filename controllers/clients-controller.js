const Client = require("../models/Client");

exports.getClients = (req, res, next) => {
    Client.getClients().then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(500).send({
            error: error,
        });
    });    
};

exports.getClient = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send("PEGANDO O ID: " + id); 
};
