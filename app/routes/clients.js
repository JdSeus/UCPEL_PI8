const express = require('express');
const router = express.Router();
const ClientsController = require('../controllers/clients-controller');

router.get('/clientes/', ClientsController.getClients);
router.get('/cliente/:id', ClientsController.getClient);

module.exports = router;