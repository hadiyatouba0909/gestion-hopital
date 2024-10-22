// routes/NotificationRoutes.js
const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();

// Route pour créer une notification
router.post('/', NotificationController.creerNotification);

// Route pour récupérer les notifications d'un utilisateur
router.get('/:destinataireId/:destinataireType', NotificationController.getNotificationsUtilisateur);

// Route pour marquer une notification comme lue
router.patch('/:id/lu', NotificationController.marquerCommeLu);

module.exports = router;
