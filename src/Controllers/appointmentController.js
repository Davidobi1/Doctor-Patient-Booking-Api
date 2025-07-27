const Appointment = require('../models/appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { AppError } = require('../utils/appError');

exports.createAppointment = async (req, res, next) => {
  try {
    const { doctorId, patientId, date, time, notes } = req.body;

    // Optional: Validate date is not in the past
    const now = new Date();
    const appointmentDateTime = new Date(`${date}T${time}:00`);
    if (appointmentDateTime < now) {
      return next(new AppError('Appointment date cannot be in the past', 400));
    }

    // Check doctor and patient existence
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

exports.getAppointments = async (req, res, next) => {
  try {
    const { doctor_id, patient_id } = req.query;

    if (!doctor_id && !patient_id) {
      return next(new AppError('doctor_id or patient_id must be provided', 400));
    }

    const filter = {};
    if (doctor_id) filter.doctorId = doctor_id;
    if (patient_id) filter.patientId = patient_id;

    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name email');

    res.status(200).json({
      success: true,
      data: { appointments }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPatientsFromAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    const uniquePatients = new Map();

    appointments.forEach(appt => {
      const patient = appt.patientId;
      if (patient && !uniquePatients.has(patient._id.toString())) {
        uniquePatients.set(patient._id.toString(), patient);
      }
    });

    res.status(200).json({
      success: true,
      data: Array.from(uniquePatients.values())
    });
  } catch (error) {
    next(error);
  }
};
