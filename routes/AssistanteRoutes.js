const express = require('express');
const router = express.Router();
const assistanteController = require('../controllers/assistanteController');
const { authenticate, authorize, canModifyUser, canCreateUser } = require('../middleware/auth');


/**
 * @swagger
 * tags:
 *   name: Assistantes
 *   description: Gestion des assistantes du cabinet médical
 */

/**
 * @swagger
 * /api/assistantes/register:
 *   post:
 *     summary: Enregistrer une nouvelle assistante
 *     tags: [Assistantes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Barry
 *               prenom:
 *                 type: string
 *                 example: Aissatou
 *               email:
 *                 type: string
 *                 example: aissatoubarry@gmail.com
 *               telephone:
 *                 type: string
 *                 example: +221 77 387 62 16
 *               password:
 *                 type: string
 *                 example: password123
 *               photo_profil:
 *                 type: string
 *                 format: binary
 *                 description: Photo de profil de l'assistante
 *     responses:
 *       201:
 *         description: Assistante créée avec succès
 *       400:
 *         description: Erreur lors de la création de l'assistante
 */

/**
 * @swagger
 * /api/assistantes/login:
 *   post:
 *     summary: Connexion pour une assistante
 *     tags: [Assistantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *                 assistanteId:
 *                   type: integer
 *       401:
 *         description: Authentification échouée
 *       400:
 *         description: Erreur de connexion
 */

/**
 * @swagger
 * /api/assistantes:
 *   get:
 *     summary: Récupérer la liste des assistantes
 *     tags: [Assistantes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des assistantes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   photo_profil:
 *                     type: string
 *                     description: URL de la photo de profil
 *       400:
 *         description: Erreur lors de la récupération des assistantes
 */

/**
 * @swagger
 * /api/assistantes/{id}:
 *   put:
 *     summary: Mettre à jour une assistante
 *     tags: [Assistantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'assistante à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *               photo_profil:
 *                 type: string
 *                 format: binary
 *                 description: Nouvelle photo de profil de l'assistante
 *     responses:
 *       200:
 *         description: Assistante mise à jour avec succès
 *       404:
 *         description: Assistante non trouvée
 *       400:
 *         description: Erreur lors de la mise à jour de l'assistante
 */

/**
 * @swagger
 * /api/assistantes/{id}:
 *   delete:
 *     summary: Supprimer une assistante
 *     tags: [Assistantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'assistante à supprimer
 *     responses:
 *       200:
 *         description: Assistante supprimée avec succès
 *       404:
 *         description: Assistante non trouvée
 *       400:
 *         description: Erreur lors de la suppression de l'assistante
 */


// Routes pour les assistantes
router.post('/register', authenticate, authorize(['medecin', 'secretaire']), canCreateUser, assistanteController.register);
router.post('/assistantes/login', assistanteController.login);
router.get('/assistantes', authenticate, authorize(['medecin', 'secretaire']), assistanteController.getAssistantes);
router.put('/assistantes/:id', authenticate, authorize(['medecin', 'secretaire']), canModifyUser, assistanteController.updateAssistante);
router.delete('/assistantes/:id', authenticate, authorize(['medecin', 'secretaire']), canModifyUser, assistanteController.deleteAssistante);

module.exports = router;