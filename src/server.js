const mongoose = require('mongoose');
const app = require('./app');
const { logger }= require('./utils/logger'); 
require('dotenv').config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info('✅ MongoDB connected');
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
      logger.info(`✅ Health check: http://localhost:${PORT}/health`);
      logger.info(`📘 API info: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
  });
