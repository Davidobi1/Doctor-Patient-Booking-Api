const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();


const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Doctor-Patient Booking API is running'
  });
});

// API Info endpoint for Postman
app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'Doctor-Patient Booking API',
    version: '1.0.0',
    description: 'REST API for managing doctor-patient appointments',
    endpoints: {
      doctors: {
        base: '/api/doctors',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
      },
      appointments: {
        base: '/api/appointments', 
        methods: ['GET', 'POST', 'PATCH']
      },
      patients: {
        base: '/api/appointments/patients',
        methods: ['GET', 'POST']
      }
    },
    postman_collection: 'See route files for detailed Postman examples'
  });
});

// API routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableEndpoints: [
      'GET /health',
      'GET /api',
      'GET /api/doctors',
      'POST /api/appointments',
      'GET /api/appointments/patients'
    ]
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API info: http://localhost:${PORT}/api`);
});

module.exports = app;