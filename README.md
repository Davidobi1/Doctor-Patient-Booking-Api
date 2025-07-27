# Doctor-Patient Booking API Service

A comprehensive REST API service for managing doctor-patient appointments with clean architecture, proper error handling, and extensive documentation.

## Features

- **Complete CRUD Operations** for doctors and appointments
- **User Role Simulation** (Doctor/Patient) without authentication
- **Proper Error Handling** with detailed error messages
- **Input Validation** using Joi schema validation
- **Pagination Support** for all list endpoints
- **API Documentation** with Swagger/OpenAPI
- **Clean Architecture** with separation of concerns
- **In-Memory Data Storage** with sample data
- **Docker Support** for easy deployment
- **Comprehensive Test Suite** with Jest
- **Security Features** (Rate limiting, CORS, Helmet)
- **Health Check Endpoint** for monitoring

## Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd doctor-booking-api

# Build and run with Docker Compose
docker-compose up --build

# The API will be available at http://localhost:3000
# API Documentation at http://localhost:3000/api-docs
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Start production server
npm start
```

## API Endpoints

### Doctors
- `GET /api/doctors` - List all doctors (with pagination and filtering)
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/doctors` - Create a new doctor
- `PUT /api/doctors/:id` - Update doctor information
- `DELETE /api/doctors/:id` - Delete a doctor

### Appointments
- `POST /api/appointments` - Book a new appointment
- `GET /api/appointments?doctor_id=:id` - Get appointments for a doctor
- `GET /api/appointments?patient_id=:id` - Get appointments for a patient
- `PATCH /api/appointments/:id/status` - Update appointment status

### Patients
- `GET /api/appointments/patients` - List all patients
- `POST /api/appointments/patients` - Create a new patient

### Utility
- `GET /health` - Health check endpoint
- `GET /api-docs` - API documentation

## Sample API Usage

### 1. Get All Doctors
```bash
curl -X GET "http://localhost:3000/api/doctors"
```

### 2. Get Doctor Details
```bash
curl -X GET "http://localhost:3000/api/doctors/{doctor-id}"
```

### 3. Create an Appointment
```bash
curl -X POST "http://localhost:3000/api/appointments" \
  -H "Content-Type: application/json" \
  -d '{
    "doctorId": "doctor-uuid",
    "patientId": "patient-uuid",
    "date": "2025-08-15",
    "time": "10:00",
    "notes": "Regular checkup"
  }'
```

### 4. Get Doctor's Appointments
```bash
curl -X GET "http://localhost:3000/api/appointments?doctor_id={doctor-id}"
```

## Sample Data

The application comes pre-loaded with:
- **5 Sample Doctors** across different specializations
- **5 Sample Patients** with complete profiles
- All with realistic data for immediate testing

## Architecture

```
src/
├── controllers/     # Request handlers
├── services/       # Business logic
├── models/         # Data models
├── routes/         # Route definitions
├── middleware/     # Custom middleware
├── validators/     # Input validation schemas
├── utils/          # Utility functions
└── server.js       # Application entry point
```

## Key Features Implemented

### ✅ Functional Requirements
- [x] Patient can view doctors and book appointments
- [x] Doctor can view their appointments
- [x] User role simulation without authentication
- [x] All required API endpoints implemented
- [x] In-memory data storage with sample data

### ✅ Bonus Features
- [x] **Comprehensive Error Handling** - Custom error classes, validation errors
- [x] **Clean Architecture** - Proper separation of controllers, services, models
- [x] **Pagination** - All list endpoints support pagination
- [x] **Input Validation** - Joi schema validation for all inputs
- [x] **API Documentation** - Complete Swagger/OpenAPI documentation
- [x] **Docker Support** - Dockerfile and docker-compose.yml
- [x] **Security Features** - Rate limiting, CORS, Helmet
- [x] **Logging System** - Structured logging with different levels
- [x] **Health Monitoring** - Health check endpoint
- [x] **Test Suite** - Comprehensive tests with Jest

## Error Handling

The API provides detailed error responses:

```json
{
  "success": false,
  "error": "Doctor not found",
  "details": "The requested doctor ID does not exist"
}
```

## Validation

Input validation using Joi schemas:
- **Doctor Data**: Name, specialization, timings validation
- **Appointment Data**: Date format, time format, required fields
- **Email/Phone**: Format validation for contact information

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Development Notes

### Design Decisions
1. **In-Memory Storage**: Used Maps for O(1) lookup performance
2. **UUID-based IDs**: More realistic than sequential integers
3. **Comprehensive Validation**: Both Joi schemas and business logic validation
4. **Clean Error Handling**: Custom error classes with proper HTTP status codes
5. **Modular Architecture**: Easy to extend and maintain

### Future Enhancements
- Database integration (PostgreSQL/MongoDB)
- Authentication & authorization
- Real-time notifications
- Email/SMS confirmations
- Calendar integration
- Advanced filtering and search

## Production Readiness

The API includes production-ready features:
- Docker containerization
- Health checks
- Security middleware
- Rate limiting
- Comprehensive logging
- Error monitoring capabilities
- API documentation

## Support

For questions or issues, please refer to:
- API Documentation: `http://localhost:3000/api-docs`
- Health Check: `http://localhost:3000/health`
- Log files for debugging information