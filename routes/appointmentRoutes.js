const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// ---------- GET ALL APPOINTMENTS ----------
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- ADD NEW APPOINTMENT ----------
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      age,
      gender,
      healthIssue,
      doctorName,
      specialization,
      date,
      time,
      status
    } = req.body;

    const appointment = new Appointment({
      patientName,
      age,
      gender,
      healthIssue,
      doctorName,
      specialization,
      date,
      time,
      status: status 
    });

    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- UPDATE APPOINTMENT ----------
router.put("/:id", async (req, res) => {
  try {
    const updatedData = req.body; // can include status, date, time, etc.
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- DELETE APPOINTMENT ----------
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
