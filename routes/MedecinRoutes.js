const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');

// Routes pour les médecins
/**
 * @swagger
 * tags:
 *   name: Médecins
 *   description: Gestion des médecins du cabinet médical
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Enregistrer un nouveau médecin
 *     tags: [Médecins]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Doe
 *               prenom:
 *                 type: string
 *                 example: John
 *               specialite:
 *                 type: string
 *                 example: Cardiologue
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               telephone:
 *                 type: string
 *                 example: +33612345678
 *               password:
 *                 type: string
 *                 example: password123
 *               adresse_professionnelle:
 *                 type: string
 *                 example: 123 Rue de la Santé
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Photo de profil du médecin
 *     responses:
 *       201:
 *         description: Médecin créé avec succès
 *       400:
 *         description: Erreur lors de la création du médecin
 */

/**
 * @swagger
 * /api/medecins/login:
 *   post:
 *     summary: Authentifier un médecin
 *     tags: [Médecins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 medecinId:
 *                   type: integer
 *       401:
 *         description: Authentification échouée
 *       400:
 *         description: Erreur de connexion
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Récupérer la liste de tous les médecins
 *     tags: [Médecins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des médecins
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
 *                   specialite:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   adresse_professionnelle:
 *                     type: string
 *       400:
 *         description: Erreur lors de la récupération des médecins
 */

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Mettre à jour un médecin
 *     tags: [Médecins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du médecin
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
 *               specialite:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *               adresse_professionnelle:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Photo de profil mise à jour du médecin
 *     responses:
 *       200:
 *         description: Médecin mis à jour avec succès
 *       404:
 *         description: Médecin non trouvé
 *       400:
 *         description: Erreur lors de la mise à jour du médecin
 */

// Routes pour les médecins
router.post('/register', medecinController.register);
router.post('/login', medecinController.login);
router.get('/', medecinController.getMedecins);
router.put('/:id', medecinController.updateMedecin);
router.delete('/:id', medecinController.deleteMedecin);

module.exports = router;
module.exports = router;
