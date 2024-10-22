const express = require('express');
const router = express.Router();
const secretaireController = require('../controllers/secretaireController');
const { authenticate, authorize, canModifyUser, canCreateUser } = require('../middleware/auth');

// Routes pour les secrétaires
router.post('/secretaires/register', authenticate, authorize(['medecin']), canCreateUser, secretaireController.register);
router.post('/secretaires/login', secretaireController.login);
router.get('/secretaires', authenticate, authorize(['medecin', 'secretaire']), secretaireController.getSecretaires);
router.put('/secretaires/:id', authenticate, authorize(['medecin', 'secretaire']), canModifyUser, secretaireController.updateSecretaire);
router.delete('/secretaires/:id', authenticate, authorize(['medecin']), canModifyUser, secretaireController.deleteSecretaire);

module.exports = router;