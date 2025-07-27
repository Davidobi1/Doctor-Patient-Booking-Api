const mongoose = require('mongoose');
const { logger } = require('../utils/logger');
require('dotenv').config(); // make sure this is here

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URI not set in environment');

    await mongoose.connect(MONGO_URI, {
    });

    logger.info(`MongoDB connected`);
  } catch (error) {
    logger.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
