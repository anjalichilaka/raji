const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/CAREDATABASE", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema and model
const escalationSchema = new mongoose.Schema(
  {
    complaint_id: String,
    escalation_level: Number,
    status: String,
    assigned_to: String, // Name of the person assigned to
    reason: String, // Reason for escalation
    notifications: Array,
    mailId: String, // New field
    name: String, // New field
    rollNumber: String, // New field
    complaintDescription: String, // New field
    action: String, // New field
  },
  { collection: "escalation", timestamps: true }
);

const Escalation = mongoose.model("escalation", escalationSchema);

// API endpoint to get all escalations
app.get("/api/escalation", async (req, res) => {
  try {
    const escalations = await Escalation.find();
    res.status(200).json(escalations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching escalations", error: error.message });
  }
});

// API endpoint to add an escalation
app.post("/api/escalation", async (req, res) => {
  try {
    const { complaint_id, escalation_level, status, assigned_to, reason, notifications } = req.body;

    const newEscalation = new Escalation({
      complaint_id,
      escalation_level,
      status,
      assigned_to,
      reason,
      notifications,
    });

    const savedEscalation = await newEscalation.save();
    res.status(201).json(savedEscalation);
  } catch (error) {
    res.status(500).json({ message: "Error saving escalation", error: error.message });
  }
});

// ✅ **NEW DELETE API Endpoint**
app.delete("/api/escalation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting complaint with ID: ${id}`); // Debugging log

    const result = await Escalation.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.status(200).json({ message: "Complaint deleted successfully!" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Server error during deletion.", error: error.message });
  }
});
// ✅ **NEW PUT API Endpoint for Updating Status**
app.put("/api/escalation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mailId, name, rollNumber, complaintDescription, action } = req.body;

    const updatedComplaint = await Escalation.findByIdAndUpdate(
      id,
      { mailId, name, rollNumber, complaintDescription, status: action },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Server error during update.", error: error.message });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
