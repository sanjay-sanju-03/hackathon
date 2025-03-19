const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Initialize the app
const app = express();
const PORT = 3000;

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schemas
const HeritageSchema = new mongoose.Schema({
  category: String,
  name: String,
  description: String,
  imageUrl: String,
  latitude: Number,
  longitude: Number,
  whatsappLink: String,
});

const ExperienceSchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Heritage = mongoose.model('Heritage', HeritageSchema);
const Experience = mongoose.model('Experience', ExperienceSchema);

// Heritage API routes
app.get('/api/heritage', async (req, res) => {
  try {
    const sites = await Heritage.find();
    res.json(sites);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

// Experience API routes
app.post('/api/experiences', upload.single('image'), async (req, res) => {
  try {
    const experience = new Experience({
      imageUrl: '/uploads/' + req.file.filename,
      description: req.body.description
    });
    await experience.save();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading experience' });
  }
});

app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching experiences' });
  }
});

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve the experience page
app.get('/experience', (req, res) => {
  res.sendFile(path.join(__dirname, '../experience.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});