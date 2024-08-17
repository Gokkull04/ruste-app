const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Note = require('./models/Note');

dotenv.config();

const app = express();

app.use(express.json());

// MongoDB connection
connectDB();

// User signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false });
  }
});

// User profile
app.get('/api/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  // Implement logout logic here
  res.json({ success: true });
});

// Add note
app.post('/api/notes', async (req, res) => {
  try {
    const { event, date, time } = req.body;
    const newNote = new Note({ event, date, time });
    await newNote.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
