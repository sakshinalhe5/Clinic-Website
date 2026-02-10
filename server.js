// Import libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ---------------- MongoDB Connection ----------------
mongoose.connect("mongodb://127.0.0.1:27017/drclinic", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// ---------------- Schemas & Models ----------------
const AppointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String,
});

const ReviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
const Review = mongoose.model("Review", ReviewSchema);

// ---------------- Routes ----------------

// Test route
app.get("/", (req, res) => {
  res.send("Doctor Clinic Backend Running 🚀");
});

// ---------------- Appointments ----------------

// ➕ Create appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.json({ message: "Appointment saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

// 📋 Get all appointments
app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// ✏️ Update appointment
app.put("/api/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Appointment updated!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// ❌ Delete appointment
app.delete("/api/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// ---------------- Reviews ----------------

// ➕ Create review
app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.json({ message: "Review submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save review" });
  }
});

// 📋 Get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // latest first
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ✏️ Update review
app.put("/api/reviews/:id", async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Review updated!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update review" });
  }
});

// ❌ Delete review
app.delete("/api/reviews/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete review" });
  }
});

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
