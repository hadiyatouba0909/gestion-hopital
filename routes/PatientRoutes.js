const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticate, authorize, canModifyUser, canCreateUser } = require('../middleware/auth');

// Routes pour les patients
router.post('/patients/register', authenticate, authorize(['medecin', 'secretaire']), canCreateUser, patientController.register);
router.get('/patients', authenticate, authorize(['medecin', 'secretaire']), patientController.getPatients);
router.put('/patients/:id', authenticate, authorize(['medecin', 'secretaire']), canModifyUser, patientController.updatePatient);
router.delete('/patients/:id', authenticate, authorize(['medecin']), canModifyUser, patientController.deletePatient);

module.exports = router;