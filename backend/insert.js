const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// Define the schema
const HeritageSchema = new mongoose.Schema({
  category: String,
  name: String,
  description: String,
  imageUrl: String,
  latitude: Number,
  longitude: Number,
  whatsappLink: String,
});

const Heritage = mongoose.model('Heritage', HeritageSchema);

// Data to insert
const data = [
  {
    category: "culture",
    name: "ASAP Community Skill Park",
    description: "A center for skill development and vocational training in Kasaragod.",
    imageUrl: "images/Asap.jpg",
    latitude: 12.5182,
    longitude: 75.0141,
    whatsappLink: "https://wa.me/9544877787"
  },
  {
    category: "temple",
    name: "Anantapura Lake Temple",
    description: "Ancient lake temple known for its unique architecture and peaceful surroundings.",
    imageUrl: "images/Anantapura_Lake_Temple.jpg",
    latitude: 12.5182,
    longitude: 75.0141,
    whatsappLink: "https://wa.me/9544877787"
  },
  {
    category: "fort",
    name: "Bekal Fort",
    description: "The largest and best-preserved fort in Kerala, offering stunning views of the Arabian Sea.",
    imageUrl: "images/bekalfort front.jpg",
    latitude: 12.3917,
    longitude: 75.0328,
    whatsappLink: "https://wa.me/9544877787"
  },
  {
    category: "culture",
    name: "Theyyam Performance",
    description: "Traditional ritual art form of North Kerala, featuring elaborate costumes and dance.",
    imageUrl: "images/Theyyam.jpg",
    latitude: 12.4996,
    longitude: 75.0023,
    whatsappLink: "https://wa.me/9544877787"
  },
  {
    category: "nature",
    name: "Natural Heritage Park",
    description: "Beautiful natural landscape showcasing the region's biodiversity.",
    imageUrl: "images/images.jpg",
    latitude: 12.4996,
    longitude: 75.0023,
    whatsappLink: "https://wa.me/9544877787"
  }
];

// Insert data
Heritage.insertMany(data)
  .then(() => {
    console.log('Data inserted successfully!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
