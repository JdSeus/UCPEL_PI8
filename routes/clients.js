const express = require('express');
const router = express.Router();
const ClientsController = require('../controllers/clients-controller');

router.get('/', ClientsController.getClients);

module.exports = router;