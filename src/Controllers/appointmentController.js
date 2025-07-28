const Appointment = require('../models/appointment');
const Doctor = require('../models/doctors');
const Patient = require('../models/patients');
const { AppError } = require('../utils/errors');

const createAppointment = async (req, res, next) => {
  try {
    const { doctorId, patientId, date, time, notes } = req.body;

    const now = new Date();
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    if (appointmentDateTime < now) {
      return next(new AppError('Appointment date cannot be in the past', 400));
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return next(new AppError('Doctor not found', 404));

    const patient = await Patient.findById(patientId);
    if (!patient) return next(new AppError('Patient not found', 404));

    const appointment = await Appointment.create({ doctorId, patientId, date, time, notes });

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const getAppointmentsByDoctorId = async (req, res, next) => {
  try {
    const { doctor_id } = req.query;
    const { page = 1, limit = 10 } = req.query;

    if (!doctor_id) return next(new AppError('doctor_id query param is required', 400));

    const query = { doctorId: doctor_id };

    const appointments = await Appointment.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name email');

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAppointmentsByPatientId = async (req, res, next) => {
  try {
    const { patient_id } = req.query;
    const { page = 1, limit = 10 } = req.query;

    if (!patient_id) return next(new AppError('patient_id query param is required', 400));

    const query = { patientId: patient_id };

    const appointments = await Appointment.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name email');

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId
};