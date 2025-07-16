require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route (fixed to return JSON for Swagger compatibility)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Contacts API!',
    documentation: '/api-docs'
  });
});

// Connect to MongoDB
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));

// Contacts API routes
app.use('/contacts', contactRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 API documentation available at http://localhost:${PORT}/api-docs`);
});
