const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= MongoDB Connection =================
mongoose
  .connect(
    "mongodb+srv://darini:darini@cluster0.a5vycrh.mongodb.net/doctorApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ================= Schemas =================

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  clinic: String,
  image: String,
  availableDays: String,   // eg: Mon,Tue,Wed
  availableTime: String,   // eg: 10:00-13:00
});

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  healthIssue: String,
  doctorName: String,
  specialization: String,
  clinic: String,          // ✅ IMPORTANT
  date: String,
  time: String,
});

// ================= Models =================
const Doctor = mongoose.model("Doctor", doctorSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

// ================= Routes =================

// Test API
app.get("/", (req, res) => {
  res.send("Doctor Appointment API running");
});

// ================= DOCTORS =================

// Get all doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add doctor
app.post("/doctors", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update doctor
app.put("/doctors/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete doctor
app.delete("/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================= APPOINTMENTS =================

// Get all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add appointment
app.post("/appointments", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ UPDATE appointment (EDIT)
app.put("/appointments/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete appointment
app.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ================= Start Server =================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
