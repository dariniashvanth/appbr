const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  clinic: { type: String },
  image: { type: String },
  availability: [
    {
      date: String,
      slots: [String],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Doctor", DoctorSchema);
