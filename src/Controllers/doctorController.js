const Doctor = require('../models/doctors');
const { AppError } = require('../utils/errors');

const getDoctors = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, specialization } = req.query;

    const query = specialization ? { specialization } : {};

    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      data: doctors,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return next(new AppError('Doctor not found', 404));

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

const createDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};


module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor
};
