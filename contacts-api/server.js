require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const cors = require('cors'); // Add this line

const app = express();

app.use(express.json());
app.use(cors()); // Add this line to enable CORS for all routes

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route for friendly welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API! Please visit /api-docs for documentation.');
});

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

// Contacts API routes
app.use('/contacts', contactRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 API documentation available at http://localhost:${PORT}/api-docs`);
});