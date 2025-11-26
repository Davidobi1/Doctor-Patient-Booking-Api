const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const doctorRoutes = require('./routes/doctorRoutes');
const appointmentroutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes'); 
const errorHandler = require('./middlewares/errorHandler');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Doctor-Patient Booking API is running'
  });
});

// API Info endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'Doctor-Patient Booking API',
    version: '1.0.0',
    description: 'REST API for managing doctor-patient appointments',
    endpoints: {
      doctors: {
        base: '/api/doctors',
        routes: [
          'GET /api/doctors',
          'GET /api/doctors/:id',
          'POST /api/doctors'
        ]
      },
      appointments: {
        base: '/api/appointments',
        routes: [
          'GET /api/appointments?doctorId={id}',
          'GET /api/appointments?patientId={id}',
          'POST /api/appointments',
        ]
      },
      patients: {
        base: '/api/patients',
        routes: [
          'GET /api/patients',
          'POST /api/patients'
        ]
      }
    },
    postman_collection: 'Refer to the provided Postman collection for full details'
  });
});

// API routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentroutes);
app.use('/api/patients', patientRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 fallback
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableEndpoints: [
      'GET /health',
      'GET /api',
      'GET /api/doctors',
      'GET /api/doctors/:id',
      'POST /api/doctors',
      'GET /api/appointments?doctorId={id}',
      'GET /api/appointments?patientId={id}',
      'POST /api/appointments',
      'GET /api/patients',
      'POST /api/patients'
    ]
  });
});

module.exports = app;
