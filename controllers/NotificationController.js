// controllers/NotificationController.js
const NotificationService = require('../services/notificationService');

class NotificationController {
  // Créer une nouvelle notification
  static async creerNotification(req, res) {
    const { type, contenu, destinataireId, destinataireType } = req.body;
    try {
      const notification = await NotificationService.creerNotification(type, contenu, destinataireId, destinataireType);
      res.status(201).json({
        success: true,
        message: 'Notification créée avec succès',
        data: notification
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la création de la notification',
        error: error.message
      });
    }
  }

  // Récupérer les notifications d'un utilisateur
  static async getNotificationsUtilisateur(req, res) {
    const { destinataireId, destinataireType } = req.params;
    try {
      const notifications = await NotificationService.getNotificationsUtilisateur(destinataireId, destinataireType);
      res.status(200).json({
        success: true,
        data: notifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des notifications',
        error: error.message
      });
    }
  }

  // Marquer une notification comme lue
  static async marquerCommeLu(req, res) {
    const { id } = req.params;
    try {
      await NotificationService.marquerCommeLu(id);
      res.status(200).json({
        success: true,
        message: 'Notification marquée comme lue'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors du marquage de la notification',
        error: error.message
      });
    }
  }
}

module.exports = NotificationController;
