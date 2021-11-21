const express = require('express');
const router = express.Router();
const ClientsController = require('../controllers/clients-controller');

const {errors} = require('celebrate');

router.get('/clientes/', ClientsController.getClients);
router.get('/cliente/:id', ClientsController.getClientValidation, ClientsController.getClient);
router.post('/cliente/', ClientsController.postClientValidation, ClientsController.postClient);
router.put('/cliente/:id', ClientsController.putClientValidation, ClientsController.putClient);
router.patch('/cliente/:id',ClientsController.patchClientValidation,  ClientsController.patchClient);
router.delete('/cliente/:id', ClientsController.deleteClient);

router.use(errors({statusCode: 400, message: "A validação falhou."}));

module.exports = router;