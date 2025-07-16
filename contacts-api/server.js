require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
app.use(express.json());

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

// Contacts API routes
app.use('/contacts', contactRoutes);

// NOTE: The root route from your original server.js is removed
// because the primary interaction should be through /contacts or /api-docs.
// If you want to keep it, you can, but it's redundant.

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 API documentation available at http://localhost:${PORT}/api-docs`);
});