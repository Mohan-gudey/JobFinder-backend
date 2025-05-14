const express = require("express");
const Job = require("../models/Job");
const router = express.Router();
const mongoose = require("mongoose");
// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Add new job
router.post("/", async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Check if ID is a valid MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid job ID format" });
  }

  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
});

// Update job
router.put("/:id", async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});

// Delete job
router.delete("/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
});

module.exports = router;