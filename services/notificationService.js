// services/notificationService.js
const Notification = require('../models/Notification');

class NotificationService {
  static async creerNotification(type, contenu, destinataireId, destinataireType) {
    try {
      return await Notification.create({
        type,
        contenu,
        destinataireId,
        destinataireType
      });
    } catch (error) {
      console.error('Erreur lors de la création de la notification:', error);
      throw error;
    }
  }

  static async getNotificationsUtilisateur(destinataireId, destinataireType) {
    try {
      return await Notification.findAll({
        where: {
          destinataireId,
          destinataireType
        },
        order: [['createdAt', 'DESC']]
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      throw error;
    }
  }

  static async marquerCommeLu(notificationId) {
    try {
      const notification = await Notification.findByPk(notificationId);
      if (notification) {
        notification.lu = true;
        await notification.save();
      }
    } catch (error) {
      console.error('Erreur lors du marquage de la notification:', error);
      throw error;
    }
  }
}

module.exports = NotificationService;