const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController');
const { authenticate, authorize } = require('../middleware/auth');

// Routes pour les rendez-vous
router.post('/', authenticate, authorize(['medecin', 'secretaire']), rendezvousController.creerRendezvous);
router.get('/', authenticate, authorize(['medecin', 'secretaire']), rendezvousController.getRendezvous);
router.put('/:id', authenticate, authorize(['medecin', 'secretaire']), rendezvousController.updateRendezvous);
router.delete('/:id', authenticate, authorize(['medecin']), rendezvousController.deleteRendezvous);

module.exports = router;