const Doctor = require('../models/Doctor');
const { AppError } = require('../utils/appError');

exports.getDoctors = async (req, res, next) => {
  try {
    const filter = req.query.specialization ? { specialization: req.query.specialization } : {};
    const doctors = await Doctor.find(filter);

    res.status(200).json({
      success: true,
      data: {
        doctors,
        pagination: { total: doctors.length }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return next(new AppError('Doctor not found', 404));

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

exports.createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return next(new AppError('Doctor not found', 404));

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return next(new AppError('Doctor not found', 404));

    res.status(204).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};
