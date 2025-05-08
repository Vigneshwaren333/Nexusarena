const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const tournamentRoutes = require('../routes/tournaments');
const authRoutes = require('../routes/auth');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// JWT Authentication middleware
const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.split(' ')[1] : null;
  
  if (!token) {
    return next(); // No token, proceed without authentication
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    next(); // Continue without authentication
  }
};

// Apply auth middleware
app.use(authMiddleware);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/esportsPlatform', {
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes with error handling
app.use('/api/tournaments', (req, res, next) => {
  try {
    return tournamentRoutes(req, res, next);
  } catch (error) {
    console.error('Error in tournament routes:', error);
    res.status(500).json({ message: 'Internal server error in tournament routes' });
  }
});

app.use('/api/auth', authRoutes);

// Add fallback for tournament routes to show dummy data at least
app.get('/api/tournaments', (req, res) => {
  // If the router above fails completely, this serves as a fallback
  res.status(200).json([]);
});

// Default route
app.get('/', (req, res) => {
  res.send('Esports Tournament Platform API');
});

// Start server
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 