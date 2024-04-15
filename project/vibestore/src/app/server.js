const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000; // or any port you prefer
app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Route to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    // Create new contact instance
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

 await newContact.save();

    // Respond with success message
    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    // Respond with error message if something goes wrong
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});
// Middleware to parse JSON bodies
app.use(express.json());
// Routes
app.post('/api/contact', (req, res) => {
  // Handle form submission here
  const { name, email, message } = req.body;
  console.log(`Received message from ${name} <${email}>: ${message}`);
  // You can perform any necessary backend operations (e.g., saving to a database) here
  res.send('Message received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
