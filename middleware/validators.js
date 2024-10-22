// middleware/validators/validationRules.js
const { body } = require('express-validator');

exports.userValidationRules = {
  register: [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    body('nom').notEmpty().withMessage('Le nom est requis'),
    body('prenom').notEmpty().withMessage('Le prénom est requis'),
    body('telephone').matches(/^[0-9+\s-]{8,}$/).withMessage('Numéro de téléphone invalide')
  ],

  login: [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis')
  ]
};

exports.patientValidationRules = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('date_naissance').isDate().withMessage('Date de naissance invalide'),
  body('sexe').isIn(['M', 'F', 'Autre']).withMessage('Sexe invalide'),
  body('adresse').notEmpty().withMessage('L\'adresse est requise'),
  body('telephone').matches(/^[0-9+\s-]{8,}$/).withMessage('Numéro de téléphone invalide'),
  body('email').isEmail().withMessage('Email invalide')
];

exports.rendezvousValidationRules = [
  body('date').isDate().withMessage('Date invalide'),
  body('heure').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Format d\'heure invalide'),
  body('motif').notEmpty().withMessage('Le motif est requis'),
  body('patientId').isInt().withMessage('ID patient invalide'),
  body('medecinId').isInt().withMessage('ID médecin invalide')
];