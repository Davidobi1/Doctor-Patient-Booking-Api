const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Appointment Endpoints', () => {
  let doctorId;
  let patientId;

  beforeAll(async () => {
    // Get a doctor ID for testing
    const doctorsRes = await request(app).get('/api/doctors');
    doctorId = doctorsRes.body.data.doctors[0].id;

    // Get a patient ID for testing
    const patientsRes = await request(app).get('/api/appointments/patients');
    patientId = patientsRes.body.data[0].id;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /api/appointments', () => {
    it('should create a new appointment', async () => {
      const appointmentData = {
        doctorId: doctorId,
        patientId: patientId,
        date: '2025-08-15',
        time: '10:00',
        notes: 'Regular checkup'
      };

      const res = await request(app)
        .post('/api/appointments')
        .send(appointmentData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.doctorId).toBe(doctorId);
      expect(res.body.data.patientId).toBe(patientId);
    });

    it('should return 400 for past appointment date', async () => {
      const appointmentData = {
        doctorId: doctorId,
        patientId: patientId,
        date: '2020-01-01',
        time: '10:00'
      };

      const res = await request(app)
        .post('/api/appointments')
        .send(appointmentData)
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/appointments', () => {
    it('should get appointments by doctor', async () => {
      const res = await request(app)
        .get(`/api/appointments?doctor_id=${doctorId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.appointments).toBeInstanceOf(Array);
    });

    it('should get appointments by patient', async () => {
      const res = await request(app)
        .get(`/api/appointments?patient_id=${patientId}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.appointments).toBeInstanceOf(Array);
    });

    it('should return 400 without doctor_id or patient_id', async () => {
      const res = await request(app)
        .get('/api/appointments')
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });
});
