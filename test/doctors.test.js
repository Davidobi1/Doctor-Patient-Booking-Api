const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

describe('Doctor Endpoints', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /api/doctors', () => {
    it('should get all doctors', async () => {
      const res = await request(app)
        .get('/api/doctors')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.doctors).toBeInstanceOf(Array);
      expect(res.body.data.pagination).toBeDefined();
    });

    it('should filter doctors by specialization', async () => {
      const res = await request(app)
        .get('/api/doctors?specialization=cardiology')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.doctors).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/doctors/:id', () => {
    it('should return 404 for non-existent doctor', async () => {
      const res = await request(app)
        .get('/api/doctors/non-existent-id')
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/doctors', () => {
    it('should create a new doctor', async () => {
      const doctorData = {
        name: 'Dr. Test Doctor',
        specialization: 'General Medicine',
        timings: ['09:00-12:00', '14:00-17:00'],
        contactInfo: {
          email: 'test@doctor.com',
          phone: '+1-555-0199'
        }
      };

      const res = await request(app)
        .post('/api/doctors')
        .send(doctorData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(doctorData.name);
      expect(res.body.data.specialization).toBe(doctorData.specialization);
    });

    it('should return 400 for invalid doctor data', async () => {
      const invalidData = {
        name: 'A',
        specialization: '',
        timings: []
      };

      const res = await request(app)
        .post('/api/doctors')
        .send(invalidData)
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });
});
