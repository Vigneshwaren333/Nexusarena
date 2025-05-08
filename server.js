const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { spawn } = require('child_process');

// Load environment variables
dotenv.config();

console.log('===============================================');
console.log('Starting Esports Tournament Platform servers...');
console.log('===============================================');

// Start the backend server
console.log('Starting backend server on port 5000...');
const backendServer = spawn('node', ['src/server/index.js'], { 
  stdio: 'inherit',
  shell: true
});

backendServer.on('error', (err) => {
  console.error('Failed to start backend server:', err);
});

// Start the React development server in development mode
console.log('Starting React development server on port 3000...');
const reactServer = spawn('npx', ['react-scripts', 'start'], { 
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    BROWSER: 'none', // Don't open browser automatically
    PORT: 3000
  }
});

reactServer.on('error', (err) => {
  console.error('Failed to start React development server:', err);
});

// Simple express server to handle production build (not used in development)
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In production mode, serve the static build files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Production server running on port ${PORT}`);
  });
} 