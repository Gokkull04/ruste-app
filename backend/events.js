// events.js

const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Event schema and model
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
});

const Event = mongoose.model("Event", eventSchema);

// Create a new event
router.post("/", async (req, res) => {
  const { title, date, description, userId } = req.body;

  try {
    const newEvent = new Event({ title, date, description, userId });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all events for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.find({ userId });
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an event
router.put("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { title, date, description } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, date, description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an event
router.delete("/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(204).send(); // No content to send back
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
