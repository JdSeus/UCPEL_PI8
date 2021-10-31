exports.getClientes = (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de clientes'
    });
};

