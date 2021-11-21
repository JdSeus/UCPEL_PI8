const Client = require("../models/Client");
const { celebrate, Joi, errors, Segments } = require('celebrate');


//////////////////////////////////////////////////////////////////////////////
//FUNÇÕES GERAIS
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

function createErrorMessage(status, message) {
    return {
        erro: {
            status: status,
            mensagem: message
        }
    }
}

//End FUNÇÕES GERAIS
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Get Clients
exports.getClients = (req, res, next) => {
    Client.getClients().then((clients) => {
        res.status(200).send(clients);
    }).catch((error) => {
        res.status(error.status).send(createErrorMessage(error.status, error.message));
    });    
};
//End Get Clients
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Get Client
const getClientMessages = {
    'number.base': 'O valor de id não é um número e não pode ser convertido para numero.',
    'number.integer': 'o valor de id não era um inteiro valido.',
    'any.required': 'O campo id é necessário.',
};
exports.getClientValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required().messages(getClientMessages)
    })
});
exports.getClient = (req, res, next) => {
    const id = req.params.id;
    Client.getClient(id).then((client) => {
        res.status(200).send(client);
    }).catch((error) => {
        res.status(error.status).send(createErrorMessage(error.status, error.message));
    });   
};
//End Get Client
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Post Client
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
        res.status(422).send(createErrorMessage(422, message));
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
        res.status(error.status).send(createErrorMessage(error.status, error.message));
    });   
};
//End Post Client
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Put Client
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
        res.status(422).send(createErrorMessage(422, message));
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
        res.status(error.status).send(createErrorMessage(error.status, error.message));
    });   
};
//End Put Client
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Patch Client
exports.patchClient = (req, res, next) => {
    const id = req.params.id;
    var hasAtLeastOneField = [];
    if (typeof req.body.nome != 'undefined') {
        var nome = req.body.nome;
        hasAtLeastOneField.push("nome");
    }
    if (typeof req.body.endereco != 'undefined') {
        var endereco = req.body.endereco;
        hasAtLeastOneField.push("endereco");
    }
    if (typeof req.body.cep != 'undefined') {
        var cep = req.body.cep;
        hasAtLeastOneField.push("cep");
    }
    if (typeof req.body.data_de_nascimento != 'undefined') {
        var data_de_nascimento = req.body.data_de_nascimento;
        hasAtLeastOneField.push("data_de_nascimento");
    }
    if (typeof req.body.telefone != 'undefined') {
        var telefone = req.body.telefone;
        hasAtLeastOneField.push("telefone");
    }

    if (hasAtLeastOneField.length != 0) {
        var dataClient = {};
        if (typeof id != 'undefined') {
            dataClient.id = id;
        }
        if (typeof nome != 'undefined') {
            dataClient.nome = nome;
        }
        if (typeof endereco != 'undefined') {
            dataClient.endereco = endereco;
        }
        if (typeof cep != 'undefined') {
            dataClient.cep = cep;
        }
        if (typeof data_de_nascimento != 'undefined') {
            dataClient.data_de_nascimento = data_de_nascimento;
        }
        if (typeof telefone != 'undefined') {
            dataClient.telefone = telefone;
        }

        Client.patchClient(dataClient).then((client) => {
            res.status(200).send(client);
        }).catch((error) => {
            res.status(error.status).send(createErrorMessage(error.status, error.message));
        });  

    } else {
        res.status(422).send(createErrorMessage(422, "Deve ser enviado ao menos um dos campos do cliente para modificação!"));
    }
};
//End Patch Client
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Delete Client
exports.deleteClient = (req, res, next) => {
    const id = req.params.id;
    Client.deleteClient(id).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(error.status).send(createErrorMessage(error.status, error.message));
    });   
};
//End Delete Client
//////////////////////////////////////////////////////////////////////////////