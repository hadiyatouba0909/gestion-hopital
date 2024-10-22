// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Erreurs Sequelize
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 'error',
        message: err.errors.map(e => e.message)
      });
    }
  
    // Erreurs JWT
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token invalide'
      });
    }
  
    // Erreurs de fichiers
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'Le fichier est trop volumineux'
      });
    }
  
    // Erreur par défaut
    res.status(500).json({
      status: 'error',
      message: 'Une erreur interne est survenue'
    });
  };
  
  class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = { errorHandler, AppError };