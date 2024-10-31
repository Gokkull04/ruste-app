const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [
    {
      eventName: { type: String, required: true },
      eventDate: { type: Date, required: true },
      eventTime: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route (basic authentication)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", email });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a note for a specific user
// POST /profile/notes route
app.post('/profile/notes', async (req, res) => {
  const { email, eventName, eventDate, eventTime } = req.body;
  if (!email || !eventName || !eventDate || !eventTime) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newNote = { email, eventName, eventDate, eventTime, createdAt: new Date() };
    // Insert the note into your database
    const result = await Note.create(newNote); // adjust this to your database method
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add note' });
  }
});


// Get notes for a specific user
app.get("/profile/notes", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user.notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a specific note
app.put("/profile/notes/:noteId", async (req, res) => {
  const { email, eventName, eventDate, eventTime } = req.body;
  const { noteId } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const note = user.notes.id(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.eventName = eventName;
    note.eventDate = eventDate;
    note.eventTime = eventTime;
    await user.save();

    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a specific note
app.delete("/profile/notes/:noteId", async (req, res) => {
  const { email } = req.body;
  const { noteId } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const note = user.notes.id(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.remove();
    await user.save();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
