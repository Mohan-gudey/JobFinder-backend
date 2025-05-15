const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  experience: { type: String },
  salary: { type: String },
  salaryNumber: { type: Number },
  description: { type: String, required: true },
  tags: [{ type: String }],
  remote: { type: Boolean, default: false },
  image: { type: String },
});

module.exports = mongoose.model("Job", jobSchema);