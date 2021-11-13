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
    Client.getClient(id).then((client) => {
        res.status(200).send(client);
    }).catch((error) => {
        res.status(error.status).send({
            erro: {
                status: error.status,
                mensagem: error.message
            }
        });
    });   
};

function sendFieldNotDefined(field) {
    res.status(422).send({
        erro: {
            status: 422,
            mensagem: "O campo " + field + " não está definido!"
        }
    });
}

function constructNotDefinedFieldsMessage(notDefinedFields) {

    if (notDefinedFields.length != 0) {
        if (notDefinedFields.length == 1) {
            var string = `O campo ${notDefinedFields[0]} não está definido!`;
        } else {
            var string = "Os campos ";
            notDefinedFields.forEach(function(value, key, array){
                if (key < array.length - 2) {
                    string += `${value}, `
                } else {
                    if (key < array.length - 1) {
                        string += `${value} e `;
                    } else {
                        string += `${value} não estão definidos!`;
                    }
                }
            });
        }
        return string;
    }
    return 'Sem erros.';
}

exports.postClient = (req, res, next) => {
    var notDefinedFields = [];
    if (typeof req.body.nome != 'undefined') {
        var nome = req.body.nome;
    } else {
        notDefinedFields.push("nome");
    }
    if (typeof req.body.endereco != 'undefined') {
        var endereco = req.body.endereco;
    } else {
        notDefinedFields.push("endereco");
    }
    if (typeof req.body.cep != 'undefined') {
        var cep = req.body.cep;
    } else {
        notDefinedFields.push("cep");
    }
    if (typeof req.body.data_de_nascimento != 'undefined') {
        var data_de_nascimento = req.body.data_de_nascimento;
    } else {
        notDefinedFields.push("data_de_nascimento");
    }
    if (typeof req.body.telefone != 'undefined') {
        var telefone = req.body.telefone;
    } else {
        notDefinedFields.push("telefone");
    }
    if (notDefinedFields.length != 0) {
        var message = constructNotDefinedFieldsMessage(notDefinedFields)
        res.status(422).send({
            erro: {
                status: 422,
                mensagem: message
            }
        });
    }

    var newCliente = {
        nome: nome,
        endereco: endereco,
        cep: cep,
        data_de_nascimento: data_de_nascimento,
        telefone: telefone,
    }

    Client.postClient(newCliente).then((client) => {
        res.status(200).send(client);
    }).catch((error) => {
        res.status(error.status).send({
            erro: {
                status: error.status,
                mensagem: error.message
            }
        });
    });   
};

exports.putClient = (req, res, next) => {
    const id = req.params.id;
    var notDefinedFields = [];
    if (typeof req.body.nome != 'undefined') {
        var nome = req.body.nome;
    } else {
        notDefinedFields.push("nome");
    }
    if (typeof req.body.endereco != 'undefined') {
        var endereco = req.body.endereco;
    } else {
        notDefinedFields.push("endereco");
    }
    if (typeof req.body.cep != 'undefined') {
        var cep = req.body.cep;
    } else {
        notDefinedFields.push("cep");
    }
    if (typeof req.body.data_de_nascimento != 'undefined') {
        var data_de_nascimento = req.body.data_de_nascimento;
    } else {
        notDefinedFields.push("data_de_nascimento");
    }
    if (typeof req.body.telefone != 'undefined') {
        var telefone = req.body.telefone;
    } else {
        notDefinedFields.push("telefone");
    }
    if (notDefinedFields.length != 0) {
        var message = constructNotDefinedFieldsMessage(notDefinedFields)
        res.status(422).send({
            erro: {
                status: 422,
                mensagem: message
            }
        });
    }

    var dataClient = {
        id: id,
        nome: nome,
        endereco: endereco,
        cep: cep,
        data_de_nascimento: data_de_nascimento,
        telefone: telefone,
    }

    Client.putClient(dataClient).then((client) => {
        res.status(200).send(client);
    }).catch((error) => {
        res.status(error.status).send({
            erro: {
                status: error.status,
                mensagem: error.message
            }
        });
    });   
};

