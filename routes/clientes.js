const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/clientes-controller');

router.get('/', ClientesController.getClientes);

module.exports = router;