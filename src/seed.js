const mongoose = require('mongoose');
const dotenv = require( 'dotenv');
const Doctor = require( './models/doctors.js');
const Patient = require( './models/patients.js');

dotenv.config(); 

const MONGO_URI = process.env.MONGO_URI;

const sampleDoctors = [
  {
    name: "Dr. Kwame Mensah",
    specialization: "Cardiologist",
    timings: ["09:00-12:00", "14:00-17:00"],
    contactInfo: {
      email: "kwame.mensah@example.com",
      phone: "0541234567"
    }
  },
  {
    name: "Dr. Ama Serwaa",
    specialization: "Dermatologist",
    timings: ["10:00-13:00", "15:00-18:00"],
    contactInfo: {
      email: "ama.serwaa@example.com",
      phone: "0249876543"
    }
  },
  {
    name: "Dr. Yaw Boateng",
    specialization: "Pediatrician",
    timings: ["08:00-11:00", "13:00-16:00"],
    contactInfo: {
      email: "yaw.boateng@example.com",
      phone: "0201122334"
    }
  },
  {
    name: "Dr. Jane Doe",
    specialization: "Cardiologist",
    timings: ["09:00-12:00","14:00-17:00"],
    contactInfo: {
      email: "jane@example.com",
      phone: "+1 555 123456"
    },         
  },
  {
    name: "Dr. Test Doctor",
    specialization: "General Medicine",
    timings: ["09:00-12:00","14:00-17:00"],
    contactInfo: {
      email: "test@doctor.com",
      phone: "+1-555-0199"
    },
  }
];

const samplePatients = [
  {
    name: "Akosua Adjei",
    age: 28,
    gender: "Female",
    contactInfo: {
      email: "akosua.adjei@example.com",
      phone: "0260001111"
    }
  },
  {
    name: "Kojo Asante",
    age: 35,
    gender: "Male",
    contactInfo: {
      email: "kojo.asante@example.com",
      phone: "0272223333"
    }
  },
  {
    name: "Efua Osei",
    age: 42,
    gender: "Female",
    contactInfo: {
      email: "efua.osei@example.com",
      phone: "0553334444"
    }
  },
  {
    name: "Kwabena Owusu",
    age: 19,
    gender: "Male",
    contactInfo: {
      email: "kwabena.owusu@example.com",
      phone: "0234445555"
    }
  },
  {
    name:"Alice Blue",
    age: 30,
    gender :"Female",
    contactInfo:{
    email: "alice.blue@example.com",
    phone:"0555569007"
    }
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Doctor.insertMany(sampleDoctors);
    await Patient.insertMany(samplePatients);
    console.log('Sample data seeded successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedDatabase();
