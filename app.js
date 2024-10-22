const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { errorHandler } = require('./middleware/errorHandler');
const sequelize = require('./config/database');

const defineAssociations = require('./models/associations');

// Configuration
dotenv.config();
const app = express();

// Middleware de sécurité et basic
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/medecins', require('./routes/MedecinRoutes'));
app.use('/api/assistantes', require('./routes/AssistanteRoutes'));
app.use('/api/secretaires', require('./routes/SecretaireRoutes'));
app.use('/api/patients', require('./routes/PatientRoutes'));
app.use('/api/rendezvous', require('./routes/RendezvousRoutes'));
app.use('/api/notifications', require('./routes/NotificationRoutes'));

// Gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  defineAssociations();
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Documentation API disponible sur: http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Database synchronization error:', err);
});

module.exports = app;