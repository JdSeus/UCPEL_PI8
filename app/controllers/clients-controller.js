const Client = require("../models/Client");
const { celebrate, Joi, Segments, Modes } = require('celebrate');

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



const generalValidationMessages = {
    'any.required': `O campo {#label} é necessário.`,
    'date.format': `{#label} deve estar no padrão de data ISO 8601.`,
    'number.base': `O valor de {#label} não é um número e não pode ser convertido para numero.`,
    'number.integer': `o valor de {#label} não era um inteiro valido.`,
    'string.base': `O valor de {#label} não é uma string.`,
    'string.length': `{#label} deve ter um comprimento de {#limit}.`,
    'string.pattern.name': `{#label} com valor \"{#value}\" não corresponde ao padrão {#name}.`,
};

//End FUNÇÕES GERAIS
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Get Clients
exports.getClients = (req, res) => {
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
exports.getClientValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required().messages(generalValidationMessages)
    })
});
exports.getClient = (req, res) => {

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
exports.postClientValidation = celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required().messages(generalValidationMessages),
            endereco: Joi.string().required().messages(generalValidationMessages),
            cep: Joi.string().length(8).pattern(/^[0-9]+$/, 'CEP').required().messages(generalValidationMessages),
            data_de_nascimento: Joi.date().iso().required().messages(generalValidationMessages),
            telefone: Joi.number().integer().required().messages(generalValidationMessages),
        })
    }, 
    {warnings: true, abortEarly: false}, 
    {mode: 'full'}
);
exports.postClient = (req, res) => {

    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const cep = req.body.cep;
    const data_de_nascimento = req.body.data_de_nascimento;
    const telefone = req.body.telefone;

    const newCliente = {
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
exports.putClientValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required().messages(generalValidationMessages)
    }),
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().messages(generalValidationMessages),
        endereco: Joi.string().required().messages(generalValidationMessages),
        cep: Joi.string().length(8).pattern(/^[0-9]+$/, 'CEP').required().messages(generalValidationMessages),
        data_de_nascimento: Joi.date().iso().required().messages(generalValidationMessages),
        telefone: Joi.number().integer().required().messages(generalValidationMessages),
    })
}, 
{warnings: true, abortEarly: false}, 
{mode: 'full'}
);
exports.putClient = (req, res) => {

    const id = req.params.id;

    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const cep = req.body.cep;
    const data_de_nascimento = req.body.data_de_nascimento;
    const telefone = req.body.telefone;

    const dataClient = {
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
exports.patchClientValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required().messages(generalValidationMessages)
    }),
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().messages(generalValidationMessages),
        endereco: Joi.string().messages(generalValidationMessages),
        cep: Joi.string().length(8).pattern(/^[0-9]+$/, 'CEP').required().messages(generalValidationMessages),
        data_de_nascimento: Joi.date().iso().messages(generalValidationMessages),
        telefone: Joi.number().integer().messages(generalValidationMessages),
    }).min(1).message("Deve ser enviado ao menos um dos campos do cliente para modificação.")
}, 
{warnings: true, abortEarly: false}, 
{mode: 'full'}
);
exports.patchClient = (req, res) => {

    const id = req.params.id;

    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const cep = req.body.cep;
    const data_de_nascimento = req.body.data_de_nascimento;
    const telefone = req.body.telefone;

    var dataClient = {};
    dataClient.id = id;

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

};
//End Patch Client
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//Delete Client
exports.deleteClientValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required().messages(generalValidationMessages)
    })
});
exports.deleteClient = (req, res) => {
    const id = req.params.id;
    Client.deleteClient(id).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(error.status).send(createErrorMessage(error.status, error.message));
    });   
};
//End Delete Client
//////////////////////////////////////////////////////////////////////////////