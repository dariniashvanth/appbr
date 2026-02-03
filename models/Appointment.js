const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  healthIssue: String,
  doctorName: String,
  specialization: String,
  date: String,
  time: String,
  status: {
    type: String,
    default: "Booked", // default status
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
