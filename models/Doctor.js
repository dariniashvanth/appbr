const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialization: { type: String },
    clinic: { type: String },
    image: { type: String },

    // NEW FIELDS
    availableDays: { type: String },   // e.g. "Mon,Tue,Wed"
    availableTime: { type: String },   // e.g. "09:00-12:00"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
