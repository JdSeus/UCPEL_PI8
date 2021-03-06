const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const routeClients = require('./app/routes/clients');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routeClients);

app.use((req, res, next) => {
    const error = new Error('Rota não encontrada')
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            status: error.status,
            mensagem: error.message
        }
    });
});


module.exports = app;