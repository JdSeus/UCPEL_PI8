const express = require('express');
const router = express.Router();
const ClientsController = require('../controllers/clients-controller');

router.get('/clientes/', ClientsController.getClients);
router.get('/cliente/:id', ClientsController.getClient);
router.post('/cliente/', ClientsController.postClient);
router.put('/cliente/:id', ClientsController.putClient);
router.delete('/cliente/:id', ClientsController.deleteClient);

module.exports = router;