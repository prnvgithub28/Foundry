const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth-simple');
const itemRoutes = require('./routes/items-simple');
const uploadRoutes = require('./routes/upload');

// Import services
const database = require('./services/database');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Foundry server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database
    await database.connect();
    
    app.listen(PORT, () => {
      console.log("Server running on port ", PORT);
      console.log("Available endpoints:");
      console.log("  GET  /health");
      console.log("  POST /api/auth/create-user");
      console.log("  POST /api/items/lost");
      console.log("  POST /api/items/found");
      console.log("  GET  /api/items/discover");
      console.log("  GET  /api/items/lost");
      console.log("  GET  /api/items/found");
      console.log("  POST /api/upload/upload");
      console.log("  DELETE /api/upload/delete/:publicId");
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await database.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await database.close();
  process.exit(0);
});
