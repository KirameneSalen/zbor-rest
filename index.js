require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Zbor = require('./models/zbor');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// ====== CRUD Endpoints for Zbor ======

// Create a new zbor
app.post('/api/zbore', async (req, res, next) => {
  try {
    const zbor = new Zbor(req.body);
    const saved = await zbor.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// Get all zbore
app.get('/api/zbore', async (req, res, next) => {
  try {
    const zbore = await Zbor.find();
    res.json(zbore);
  } catch (err) {
    next(err);
  }
});

// Get a single zbor by ID
app.get('/api/zbore/:id', async (req, res, next) => {
  try {
    const zbor = await Zbor.findById(req.params.id);
    if (!zbor) return res.status(404).json({ message: 'Zbor not found' });
    res.json(zbor);
  } catch (err) {
    next(err);
  }
});

// Update a zbor by ID
app.put('/api/zbore/:id', async (req, res, next) => {
  try {
    const updated = await Zbor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Zbor not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete a zbor by ID
app.delete('/api/zbore/:id', async (req, res, next) => {
  try {
    const deleted = await Zbor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Zbor not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// ====== Global Error Handler ======
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ====== Connect to MongoDB & Start Server ======
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
