const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000; // or any port you prefer

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/enquiry', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Handle connection errors
db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

const dataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Define model based on schema
const Data = mongoose.model('Data', dataSchema);

app.post('/api/contact', async (req, res) => {
  try {
    // Create new contact instance
    const newData = new Data({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    
    // Save data to database
    await newData.save();

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    // Respond with error message if something goes wrong
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
