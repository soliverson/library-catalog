const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const borrowingRecordRoutes = require('./routes/borrowingRoutes');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static frontend files

// Routes
app.use('/books', bookRoutes); // Books API routes
app.use('/authors', authorRoutes); // Authors API routes
app.use('/borrowing-records', borrowingRecordRoutes); // Borrowing Records API routes

// Default route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
