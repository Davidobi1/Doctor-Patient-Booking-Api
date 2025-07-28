# 🏥 Doctor-Patient Booking API

A RESTful API service for managing doctor-patient bookings, including appointment scheduling, patient and doctor records, and health checks. Built with **Node.js**, **Express**, and **MongoDB** using **Mongoose**.

---

## 📁 Project Structure

```
├── src/
│   ├── controllers/        # Business logic for each route
│   ├── models/             # Mongoose models
│   ├── routes/             # Express route definitions
│   ├── validators/         # Joi validation schemas
│   ├── utils/              # Logging and helper functions
│   ├── app.js              # Express app setup
│   └── server.js           # Server and DB entry point
├── Dockerfile              # Container build config
├── docker-compose.yml      # Local dev & prod containers
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB
- Docker 

### 1. Clone the repository

```bash
git clone https://github.com/your-username/doctor-patient-api.git
cd doctor-patient-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/clinic
NODE_ENV=development
```

---

## 🧪 Running the API

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Docker (Recommended)

```bash
docker-compose up --build
```

---

## 📌 API Endpoints

### 👩‍⚕️ Doctors

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| POST   | `/doctors`           | Create a new doctor    |
| GET    | `/doctors`           | Get all doctors        |
| GET    | `/doctors/:id`       | Get specific doctor    |           
### 👨‍👩‍👧 Patients

| Method | Endpoint             | Description             |
|--------|----------------------|-------------------------|
| POST   | `/patients`          | Register a new patient  |
| GET    | `/patients`          | Get all patients        |

### 📅 Appointments

| Method | Endpoint               | Description             |
|--------|------------------------|-------------------------|
| POST   | `/appointments`        | Book a new appointment  |
| GET    | `/appointments?patients_id=`| Get patient appointment |
| GET    | `/appointments?doctor_id=`|Get doctors appointment|

### 🔄 Health

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | `/health`        | Health check status  |
| GET    | `/api`           | Api docs             |
---

## ✅ Features

- 📚 Modular architecture
- 🔒 Input validation with Joi
- 🗃️ MongoDB with Mongoose
- 🐳 Docker + Docker Compose support
- 🔁 Health check endpoints
- 📄 Logging with timestamps

---

## 🧪 Seeding Sample Data

```bash
node src/seed.js
```

This seeds doctors and patients into your MongoDB database.

---


## 📦 Example Requests (Postman)

Import the Postman collection provided , or manually test:
https://web.postman.co/workspace/My-Workspace~f26246a3-b771-4df4-81de-73eb6a52d2e5/collection/38720190-0e440fd3-d70d-4265-bf88-98ef2e4a609c?action=share&source=copy-link&creator=38720190

```http
POST /patients
{
  "name": "Akosua Adjei",
  "age": 28,
  "gender": "Female",
  "contactInfo": {
    "email": "akosua.adjei@example.com",
    "phone": "0260001111"
  }
}
```

---

## 📄 License

MIT © 2025 — David Obi